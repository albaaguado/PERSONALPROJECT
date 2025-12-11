import { Link } from "react-router-dom";
import React from "react";

export default function ProductCard({ product }) {
  if (!product) return null;

  const { name, price, img } = product


  return (
    <Link 
      to={`/shop/${encodeURIComponent(name)}`} 
      className="article-link"
    >
      <div className="article-card">
        <div className="article-img-container">
          <img src={img} alt={name} className="article-img" />
        </div>
        <div className="article-name">{name}</div>
        <div className="article-price">{price}{typeof price === "number" ? "€" : ""}</div>
      </div>
    </Link>
  );
}
