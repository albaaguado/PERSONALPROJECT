import React, { useState } from "react";
import "./shop.css";
import Articles from "./shop/articles";
import { useCart } from "../context/CartContext";

export default function Shop() {
  const [activeTag, setActiveTag] = useState(null);
  const { addToCart } = useCart();

  // Lista de botones del índice
  const musicalTitles = ["Lion King", "Wicked", "Aladdin", "West Side Story", "Les Misérables"];

  // Maneja selección de tag
  const handleTagClick = (tag) => setActiveTag(activeTag === tag ? null : tag);

  return (
    <div className="shop-container">
      <div className="shop-header">
        <div className="shop-header-bg" />
        <div className="shop-subtitle">MERCHANDISING</div>
        <div className="shop-title">BACKSTAGE</div>
      </div>

      <div className="shop-index">
        {musicalTitles.map((title, index) => (
          <button
            key={index}
            className={`shop-index-button ${activeTag === title ? 'active' : ''}`}
            onClick={() => handleTagClick(title)}
          >
            {title}
          </button>
        ))}
      </div>

      <Articles activeTag={activeTag} />
    </div>
  );
}