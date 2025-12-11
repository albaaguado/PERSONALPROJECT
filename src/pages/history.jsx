import React from "react";
import Timeline from "./history/timeline";
import Texts from "./history/texts";
import "./history.css";

export default function History() {
  return (
    <div className="history-container">
      <div className="history-header">
        <h1 className="history-title-top">history of</h1>
        <h1 className="history-title-bottom">MUSICALS</h1>
      </div>

      {/* --- CONTENEDOR CON DOS COLUMNAS --- */}
      <div className="history-content">
        <div className="texts-section">
          <Texts />
        </div>

        <div className="timeline-section">
          <Timeline />
        </div>
      </div>
    </div>
  );
}
