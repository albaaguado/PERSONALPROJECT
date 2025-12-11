import React, { createContext, useState, useContext, useEffect } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const initialCart = () => {
    const localStorageCart = localStorage.getItem("cart");
    return localStorageCart ? JSON.parse(localStorageCart) : [];
  };

  const [cart, setCart] = useState(() => initialCart());

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));

  }, [cart]);

  function addToCart (item) {
    // Para productos con tallas, considerar la talla al buscar si el producto ya existe
    // Si tiene talla, buscar por id + talla; si no tiene talla, buscar solo por id
    const itemIndex = cart.findIndex(product => {
      if (product.id === item.id) {
        // Si ambos tienen talla, deben coincidir
        if (product.size && item.size) {
          return product.size === item.size;
        }
        // Si uno tiene talla y el otro no, son diferentes
        if (product.size !== item.size) {
          return false;
        }
        // Si ninguno tiene talla, es el mismo producto
        return true;
      }
      return false;
    });
    
    if (itemIndex >= 0) {
      // El producto ya existe (mismo id y misma talla), incrementar cantidad
      if (cart[itemIndex].quantity >= 10) return 
      const updatedCart = [...cart];
      updatedCart[itemIndex].quantity++;
      setCart(updatedCart);
    } else {
      // El producto no existe o tiene diferente talla, añadirlo con la cantidad especificada o 1 por defecto
      const initialQuantity = item.quantity || 1;
      const newItem = { ...item, quantity: initialQuantity };
      setCart([...cart, newItem]);
    }
  };

  function removeFromCart(id, size = null) {
    setCart(prevCart => prevCart.filter(product => {
      // Si se especifica talla, comparar también la talla
      if (size !== null) {
        return !(product.id === id && product.size === size);
      }
      // Si no se especifica talla, eliminar solo por id (para compatibilidad)
      return product.id !== id;
    }));
  }

  function increaseQuantity(id, size = null) {
    const updatedCart = cart.map(item => {
      // Comparar id y talla si se especifica
      const matches = size !== null 
        ? (item.id === id && item.size === size)
        : (item.id === id);
      
      if (matches && item.quantity < 10) {
        return {
          ...item,
          quantity: item.quantity + 1
        };
      }
      return item;
    });
    setCart(updatedCart);
  }

  function decreaseQuantity(id, size = null) {
    const updatedCart = cart.map(item => {
      // Comparar id y talla si se especifica
      const matches = size !== null 
        ? (item.id === id && item.size === size)
        : (item.id === id);
      
      if (matches && item.quantity > 1) {
        return {
          ...item,
          quantity: item.quantity - 1
        };
      }
      return item;
    });
    setCart(updatedCart);
  }

  function clearCart() {
    setCart([]);
  }


  return (
    <CartContext.Provider value={{ cart, setCart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}