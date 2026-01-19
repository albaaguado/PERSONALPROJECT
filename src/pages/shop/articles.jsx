import "./articles.css";
import ProductCard from "./productcard";
import { PRODUCTS_DB } from "../../data/bd_articles.js";

export default function Articles({ activeTag }) {
    const filteredProducts = activeTag
        ? PRODUCTS_DB.filter(p => p.tag === activeTag)
        : PRODUCTS_DB;

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
