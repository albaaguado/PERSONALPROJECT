import React from "react";
import "./live.css";
import lionKing from "../../img/musicales/fotos 'actuaciones'/edit_lionking.png"; // tu nueva imagen unificada
import { useCart } from "../../context/CartContext";

const Live = () => {
  const { addToCart } = useCart();

  const handleBuyNow = () => {
    const liveItem = {
      id: "live-lion-king",
      name: "THE LION KING - LIVE EXPERIENCE",
      img: lionKing,
      price: 20, // precio del live
      tag: "Lion King Live",
      type: "live",
    };

    addToCart(liveItem);
  };

  return (
    <div id="live" className="live-section">
      <img src={lionKing} alt="The Lion King Live" className="live-bg" />

      <div className="live-overlay">
        <div className="live-text">
          <p className="see-it">SEE IT IN</p>
          <span className="live-badge">LIVE</span>
          <p className="this-week">THIS WEEK!</p>
        </div>

        <button className="buy-btn" onClick={handleBuyNow}>
          BUY NOW
        </button>
      </div>
    </div>
  );
};

export default Live;
