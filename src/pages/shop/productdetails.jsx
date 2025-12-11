import React from 'react';
import { useState } from 'react'; // Importar useState
import { useParams } from 'react-router-dom';
import { PRODUCTS_DB } from '../../data/bd_articles.js'; 
import './productdetails.css'; 
import { useCart } from '../../context/CartContext';

export default function ProductDetail() { 
    // [NUEVO] Estado para la talla seleccionada. Inicialmente null.
    const { addToCart } = useCart();
    const [selectedSize, setSelectedSize] = useState(null);
    const [showErrorPopup, setShowErrorPopup] = useState(false); 
    const { productName } = useParams();
    const decodedProductName = decodeURIComponent(productName);
    const product = PRODUCTS_DB.find(item => item.name === decodedProductName);

    if (!product) {
        return (
            <div className="product-detail-page">
                <div className="product-content">
                    <h1>Error 404</h1>
                    <p>Product "{decodedProductName}" not found.</p>
                </div>
            </div>
        );
    }

    const description = `An official merchandise item from the musical ${product.tag}. High quality and exclusive design. Made with sustainable materials and designed to last. Perfect for any musical theater fan!`;
    const isApparel = ['shirt', 'sweat', 'vest', 'pijama', 'long sleeves'].some(keyword => product.name.toLowerCase().includes(keyword));

    // [NUEVO] Función para manejar el click
    const handleSizeClick = (size) => {
        // Si el tamaño clicado ya está seleccionado, lo deseleccionamos (null).
        // Si no, seleccionamos el nuevo tamaño.
        setSelectedSize(prevSize => prevSize === size ? null : size);
    };

    // Array de tallas, lo hacemos un array para mapearlo fácilmente
    const sizes = ['S', 'M', 'L', 'XL'];

    return (
        <div className="product-detail-page">
            <div className="product-breadcrumb">Shop - {product.tag}</div>
            
            <div className="product-content">
                
                {/* Área de la Imagen... */}
                <div className="product-image-area">
                    <img src={product.img} alt={product.name} className="product-detail-img" />
                </div>

                {/* Área de Información... */}
                <div className="product-info-area">
                    <h1 className="product-detail-name">{product.name}</h1>
                    
                    <div className="product-detail-price-section">
                        <div className="product-detail-price">{product.price}€</div>
                        
                        <h2 className="product-detail-desc-title">PRODUCT DESCRIPTION</h2>
                        <p className="product-detail-description">{description}</p>
                    </div>

                    
                    {/* Sección de Talla - Solo si es ropa */}
                    { isApparel && (
                        <>
                        <div className="product-size-label">Select size</div>
                        <div className="product-size-options">
                            {/* [MODIFICADO] Mapeamos el array de tallas */}
                            {sizes.map((size) => (
                                <button
                                    key={size}
                                    className={`size-button ${selectedSize === size ? 'active-size' : ''}`}
                                    onClick={() => handleSizeClick(size)}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                        </>
                    )}

                    <div className="product-actions">
                        <button 
                            className="add-to-cart-button"
                            type="button"
                            onClick={() => {
                                // Validar que se haya seleccionado talla si es una prenda
                                if (isApparel && !selectedSize) {
                                    setShowErrorPopup(true);
                                    // Cerrar automáticamente después de 3 segundos
                                    setTimeout(() => setShowErrorPopup(false), 3000);
                                    return;
                                }
                                // Añadir producto con talla si es una prenda
                                const productWithSize = isApparel 
                                    ? { ...product, size: selectedSize }
                                    : { ...product, size: null };
                                addToCart(productWithSize);
                            }}
                            // Remover disabled para que el onClick funcione
                            style={isApparel && !selectedSize ? { opacity: 0.6, cursor: 'not-allowed' } : {}}
                        >
                            add to cart
                        </button>
                    </div>
                </div>
            </div>
            
            {/* Popup de Error */}
            {showErrorPopup && (
                <div className="error-popup-backdrop" onClick={() => setShowErrorPopup(false)}>
                    <div className="error-popup-content" onClick={(e) => e.stopPropagation()}>
                        <div className="error-popup-header">
                            <span className="error-popup-icon">⚠️</span>
                            <button 
                                className="error-popup-close" 
                                onClick={() => setShowErrorPopup(false)}
                                aria-label="Close"
                            >
                                ×
                            </button>
                        </div>
                        <div className="error-popup-message">
                            You have to pick a size
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}