import React from "react";
import "./indexprogram.css";

// Contenido de available-icon.svg (el rayo)
const AvailableIconSVG = () => (
    <svg 
        className="available-icon" // Clase para el CSS
        xmlns="http://www.w3.org/2000/svg" 
        id="Layer_1" 
        data-name="Layer 1" 
        viewBox="0 0 24 24" 
        // Hereda el color negro del botón .available-now
        fill="currentColor"
    >
        <path d="M11.24,24a2.262,2.262,0,0,1-.948-.212,2.18,2.18,0,0,1-1.2-2.622L10.653,16H6.975A3,3,0,0,1,4.1,12.131l3.024-10A2.983,2.983,0,0,1,10,0h3.693a2.6,2.6,0,0,1,2.433,3.511L14.443,8H17a3,3,0,0,1,2.483,4.684l-6.4,10.3A2.2,2.2,0,0,1,11.24,24ZM10,2a1,1,0,0,0-.958.71l-3.024,10A1,1,0,0,0,6.975,14H12a1,1,0,0,1,.957,1.29L11.01,21.732a.183.183,0,0,0,.121.241A.188.188,0,0,0,11.4,21.9l6.4-10.3a1,1,0,0,0,.078-1.063A.979.979,0,0,0,17,10H13a1,1,0,0,1-.937-1.351l2.19-5.84A.6.6,0,0,0,13.693,2Z"/>
    </svg>
);

// Contenido de clock-three.svg adaptado para React
const ClockIconSVG = () => (
    <svg 
        className="clock-icon"
        xmlns="http://www.w3.org/2000/svg" 
        id="Layer_1" 
        data-name="Layer 1" 
        viewBox="0 0 24 24" 
        // Usamos currentColor para heredar el color del botón
        fill="currentColor"
    >
        <path d="M12,24C5.383,24,0,18.617,0,12S5.383,0,12,0s12,5.383,12,12-5.383,12-12,12Zm0-22C6.486,2,2,6.486,2,12s4.486,10,10,10,10-4.486,10-10S17.514,2,12,2Zm5,10c0-.553-.447-1-1-1h-3V6c0-.553-.448-1-1-1s-1,.447-1,1v6c0,.553,.448,1,1,1h4c.553,0,1-.447,1-1Z"/>
    </svg>
);


export default function IndexSection() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="index-section">
      <button
        className="card available-now"
        onClick={() => scrollTo("upcomingshows")}
        aria-label="Go to available now"
      >
        <div className="icon">
             {/* Icono de Rayo */}
             <AvailableIconSVG /> 
        </div>
        <div className="card-text">available now</div>
      </button>

      <button
        className="card upcoming-soon"
        onClick={() => scrollTo("sections")}
        aria-label="Go to upcoming soon"
      >
        <div className="icon">
            {/* USAMOS EL NUEVO ICONO */}
            <ClockIconSVG /> 
        </div>
        <div className="card-text">upcoming soon</div>
      </button>
    </div>
  );
}
