import React from "react";
import "./last_minute.css";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import img1 from "../../img/musicales/portadas/wicked_vertical.jpg";
import img2 from "../../img/musicales/portadas/westsidestory_vertical.webp";
import img3 from "../../img/musicales/portadas/victorovictoria_vertical.jpg";
import img4 from "../../img/musicales/portadas/miserables_vertical.jpg";


export default function LastMinute() {
  const navigate = useNavigate();
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  const handleMoreInfoClick = () => {
    if (isAuthenticated) {
      // Ir a programación mostrando solo los 3 musicales de última hora
      navigate("/program", { state: { lastMinuteFilter: true } });
    } else {
      // Si no está logueado, mandar al flujo de login de Auth0
      loginWithRedirect();
    }
  };

  return (
    <section id="last_minute" className="last-minute">
      <div className="last-minute-overlay" />
      <div className="imagenes">
        <img src={img1} alt="Promo 1" />
        <img src={img2} alt="Promo 2" />
        <img src={img3} alt="Promo 3" />
        <img src={img4} alt="Promo 4" />
      </div>
      <div className="texto">
        <p className="decoracion">_______________________________</p>
        <h2 className="titulo">LAST MINUTE<br />TICKETS</h2>
        <p className="subtitulo">
          BOOK YOUR TICKETS NOW AND GET A 30% DISCOUNT
        </p>
      </div>
      <button className="boton-info" onClick={handleMoreInfoClick}>
        CLICK HERE FOR MORE INFORMATION
      </button>
    </section>
  );
}
