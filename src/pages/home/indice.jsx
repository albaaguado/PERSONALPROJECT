import React, { useState, useEffect } from "react";
import "./indice.css";

// Icono del reloj (para "last minute tickets")
const ClockIconSVG = () => (
    <svg 
        className="opcion-icon-svg" 
        xmlns="http://www.w3.org/2000/svg"  
        id="Layer_1" 
        data-name="Layer 1" 
        viewBox="0 0 24 24" 
        fill="currentColor"
    >
        <path d="M12,24C5.383,24,0,18.617,0,12S5.383,0,12,0s12,5.383,12,12-5.383,12-12,12Zm0-22C6.486,2,2,6.486,2,12s4.486,10,10,10,10-4.486,10-10S17.514,2,12,2Zm5,10c0-.553-.447-1-1-1h-3V6c0-.553-.448-1-1-1s-1,.447-1,1v6c0,.553,.448,1,1,1h4c.553,0,1-.447,1-1Z"/>
    </svg>
);

// Icono de Reproductor (para "live options") - ¡Corregido el nombre a PlayIconSVG!
const PlayIconSVG = () => (
    <svg 
        className="opcion-icon-svg" 
        xmlns="http://www.w3.org/2000/svg" 
        id="Layer_1" 
        data-name="Layer 1" 
        viewBox="0 0 24 24" 
        fill="currentColor"
    >
        <path d="M12,0C5.383,0,0,5.383,0,12s5.383,12,12,12,12-5.383,12-12S18.617,0,12,0Zm0,21c-4.963,0-9-4.038-9-9S7.037,3,12,3s9,4.038,9,9-4.037,9-9,9Zm3.914-7.999l-5.202,2.85c-.766.431-1.712-.123-1.712-1.001v-5.699c0-.879.946-1.432,1.712-1.001l5.202,2.85c.781.439.781,1.563,0,2.002Z"/>
    </svg>
);

// Icono de Noticiero (para "news")
const NewsIconSVG = () => (
    <svg 
        className="opcion-icon-svg" 
        xmlns="http://www.w3.org/2000/svg" 
        id="Layer_1" 
        data-name="Layer 1" 
        viewBox="0 0 24 24"
        fill="currentColor"
    >
        <path d="m21.721,0h-2.047l2.209,12h-5.883v2c0,1.103-.897,2-2,2h-4c-1.103,0-2-.897-2-2v-2H2.118L4.338,0h-2.051L0,12.227l.005,8.766c-.002.802.309,1.558.876,2.126s1.321.881,2.124.881h17.995c1.654,0,3-1.346,3-3v-8.5L21.721,0Zm.279,21c0,.551-.449,1-1,1H3.005c-.268,0-.519-.104-.708-.294s-.292-.441-.292-.711l-.004-6.995h3.999c0,2.206,1.794,4,4,4h4c2.206,0,4-1.794,4-4h4v7Zm-3.991-19H6.002l.37-2h11.269l.368,2Zm1.472,8H4.522l.37-2h14.221l.368,2Zm-.736-4H5.262l.37-2h12.745l.368,2Z"/>
    </svg>
);

// Icono de Corazón (para "most populars")
const PopularIconSVG = () => (
    <svg 
        className="opcion-icon-svg" 
        xmlns="http://www.w3.org/2000/svg" 
        id="Outline" 
        viewBox="0 0 24 24" 
        fill="currentColor"
    >
        <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z"/>
    </svg>
);


// Función auxiliar para renderizar el icono correcto
const renderIcon = (texto) => {
    switch (texto) {
        case "last minute tickets":
            return <ClockIconSVG />;
        case "live options":
            return <PlayIconSVG />; // Usamos el icono de Reproductor
        case "most populars":
            return <PopularIconSVG />; // Corazón
        case "news":
            return <NewsIconSVG />; // Noticiero
        default:
            return null;
    }
};

export default function Indice() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [headerScrolled, setHeaderScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 100);
      setHeaderScrolled(scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const opciones = [
    { texto: "last minute tickets", color: "#C77DFF" },
    { texto: "live options", color: "#B13A2C" },
    { texto: "most populars", color: "#F0A6CA" },
    { texto: "news", color: "#457B9D" },
  ];

  const idMap = {
    "last minute tickets": "last_minute",
    "live options": "live",
    "most populars": "populares",
    "news": "news",
  };

  const scrollTo = (texto) => {
    const id = idMap[texto];
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleKey = (e, texto) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      scrollTo(texto);
    }
  };

  return (
    <section className={`indice ${isScrolled ? "scrolled" : ""} ${headerScrolled ? "header-scrolled" : ""}`}>
      <div className="opciones">
        {opciones.map((op, i) => (
          <div
            key={i}
            className="opcion"
            role="button"
            tabIndex={0}
            style={{ borderColor: op.color, color: op.color }}
            onClick={() => scrollTo(op.texto)}
            onKeyDown={(e) => handleKey(e, op.texto)}
          >
            <div className="icono" style={{ outlineColor: op.color }}>
              {renderIcon(op.texto)}
            </div>
            <span className="texto-opcion">{op.texto}</span>
          </div>
        ))}
      </div>
    </section>
  );
}