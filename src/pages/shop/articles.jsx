import "./articles.css";
import { useState } from "react";
import ProductCard from "./productcard";
import { PRODUCTS_DB } from "../../data/bd_articles.js";

export default function Articles({ activeTag }) {
    const [data, setData] = useState(PRODUCTS_DB);

    const filteredProducts = activeTag
        ? data.filter(p => p.tag === activeTag)
        : data;

    const displayedProducts = filteredProducts.filter(Boolean);

    return (
        <div className="articles-grid">
            {displayedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
            ))}
        </div>
    );
}
