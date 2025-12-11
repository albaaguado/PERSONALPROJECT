import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useDatabase } from "../context/DatabaseContext";

export default function CartDropdown() {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = useCart();
  const { getProductStock, decreaseProductStock, markSeatsAsOccupied } = useDatabase();
  const [purchaseMessage, setPurchaseMessage] = useState(null);
  
  const cartTotal = () => cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handlePurchase = () => {
    // Validar stock antes de comprar
    const stockErrors = [];
    
    cart.forEach(item => {
      // Solo validar stock para productos normales (no entradas)
      if (item.type !== 'ticket' && item.id) {
        const currentStock = getProductStock(item.id);
        if (currentStock < item.quantity) {
          stockErrors.push(`${item.name}: Only ${currentStock} units available (you requested ${item.quantity})`);
        }
      }
    });

    // Si hay errores de stock, mostrar mensaje y no procesar compra
    if (stockErrors.length > 0) {
      setPurchaseMessage({
        type: 'error',
        text: `Stock error:\n${stockErrors.join('\n')}`
      });
      setTimeout(() => setPurchaseMessage(null), 5000);
      return;
    }

    // Procesar compra: disminuir stock y marcar asientos
    cart.forEach(item => {
      if (item.type === 'ticket') {
        // Es una entrada: marcar asientos como ocupados
        if (item.seats && item.seats.length > 0 && item.tag && item.date) {
          // Convertir seats a formato esperado
          // Los IDs deben coincidir con el formato: LEFT-1-1, CENTER-1-1, RIGHT-1-1
          const seatsData = item.seats.map(seat => {
            const sectionUpper = seat.section ? seat.section.toUpperCase() : 'CENTER';
            return {
              id: `${sectionUpper}-${seat.row}-${seat.number}`,
              row: seat.row,
              number: seat.number,
              section: seat.section || 'center',
              zone: seat.zone
            };
          });
          markSeatsAsOccupied(seatsData, item.tag, item.date);
        }
      } else {
        // Es un producto: disminuir stock
        if (item.id) {
          decreaseProductStock(item.id, item.quantity);
        }
      }
    });

    // Limpiar carrito después de compra exitosa
    clearCart();
    
    // Mostrar mensaje de éxito
    setPurchaseMessage({
      type: 'success',
      text: 'Purchase completed successfully!'
    });
    setTimeout(() => setPurchaseMessage(null), 3000);
  };
  return (
    <div id="carrito" className="carrito-dropdown">
      {cart.length === 0 ? (
        <p className="text-center">Cart is empty</p>
      ) : (
        <>
          <table className="w-100 table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Size</th>
                <th>Price</th>
                <th>Quantity</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cart.map((product, index) => {
                // Crear un identificador único que incluya id y talla
                const uniqueId = `${product.id}-${product.size || 'no-size'}-${index}`;
                return (
                  <tr key={uniqueId}>
                    <td>
                      {product.img ? (
                        <img 
                          className="img-fluid" 
                          src={product.img}
                          alt={product.name} 
                        />
                      ) : (
                        <div className="ticket-icon">🎫</div>
                      )}
                    </td>
                    <td>{product.name}</td>
                    <td className="fw-bold">{product.size || 'U'}</td>
                    <td className="fw-bold">{product.price}€</td>
                    <td className="d-flex align-items-center justify-content-center gap-4">
                      <button
                        type="button"
                        className="btn btn-dark"
                        onClick={() => decreaseQuantity(product.id, product.size)}
                      >
                        -
                      </button>
                      {product.quantity}
                      <button
                        type="button"
                        className="btn btn-dark"
                        onClick={() => increaseQuantity(product.id, product.size)}
                      >
                        +
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-danger"
                        type="button"
                        onClick={() => removeFromCart(product.id, product.size)}
                      >
                        X
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <p className="text-end">
            Total to pay: <span className="fw-bold">{cartTotal()}€</span>
          </p>

          {purchaseMessage && (
            <div className={`alert ${purchaseMessage.type === 'error' ? 'alert-danger' : 'alert-success'} mt-3`} role="alert">
              {purchaseMessage.text.split('\n').map((line, i) => (
                <div key={i}>{line}</div>
              ))}
            </div>
          )}
          
          <button 
            className="btn btn-success w-100 mt-3 p-2" 
            type="button" 
            onClick={handlePurchase}
            style={{ fontSize: '16px', fontWeight: 'bold' }}
          >
            BUY
          </button>
          
          <button 
            className="btn btn-dark w-100 mt-2 p-2" 
            type="button" 
            onClick={clearCart}
          >
            EMPTY CART
          </button>
        </>
      )}
    </div>
  );
}

