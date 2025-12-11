import React from "react";
import { Link } from "react-router-dom";
import "./populares.css";
import aladdin from "../../img/musicales/fotos 'actuaciones'/aladdin.jpg"
import chicago from "../../img/musicales/fotos 'actuaciones'/chicago.jpg"
import hamilton from "../../img/musicales/fotos 'actuaciones'/hamilton.jpg"
import mammaMia from "../../img/musicales/fotos 'actuaciones'/mammamia.jpg"  
import lesMiserables from "../../img/musicales/fotos 'actuaciones'/miserables.jpg"
import wicked from "../../img/musicales/fotos 'actuaciones'/wicked.webp"
import phantom from "../../img/musicales/fotos 'actuaciones'/phantomopera.jpg"
import westSideStory from "../../img/musicales/fotos 'actuaciones'/westsidestory.webp"
import moulinRouge from "../../img/musicales/fotos 'actuaciones'/moulinrouge.jpeg"
import singingInTheRain from "../../img/musicales/fotos 'actuaciones'/cantandobajolalluvia.webp"
import grease from "../../img/musicales/fotos 'actuaciones'/grease.jpg"
import maryPoppins from "../../img/musicales/fotos 'actuaciones'/marypoppins.jpg"        

const popularesData = [
  { titulo: "ALADDIN", precio: "from 80€", img: aladdin, link: "../info/info_aladdin" },
  { titulo: "CHICAGO", precio: "from 96.8€", img: chicago, link: "..//info/info_chicago" },
  { titulo: "HAMILTON", precio: "from 73€", img: hamilton, link: "..//info/info_hamilton" },
  { titulo: "MAMMA MIA", precio: "from 65€", img: mammaMia, link: "..//info/info_mammamia" },
  { titulo: "LES MISÉRABLES", precio: "from 92€", img: lesMiserables, link: "..//info/info_lesmiserables" },
  { titulo: "WICKED", precio: "from 102.55€", img: wicked, link: "..//info/info_wicked" },
  { titulo: "PHANTOM OF THE OPERA", precio: "from 84€", img: phantom, link: "..//info/info_phantomopera" },
  { titulo: "WEST SIDE STORY", precio: "from 76€", img: westSideStory, link: "..//info/info_westsidestory" },
  { titulo: "MOULIN ROUGE", precio: "from 110€", img: moulinRouge, link: "..//info/info_moulin" },
  { titulo: "SINGING IN THE RAIN", precio: "from 68€", img: singingInTheRain, link: "..//info/info_singingrain" },
  { titulo: "GREASE", precio: "from 95.6€", img: grease, link: "..//info/info_grease" },
  { titulo: "MARY POPPINS", precio: "from 82€", img: maryPoppins, link: "..//info/info_poppins" },
];

const Populares = () => {
  return (
    <section id="populares" className="populares-section">
      <h2 className="populares-title">MOST POPULARS</h2>

      <div className="populares-grid">
        {popularesData.map((obra, index) => (
          <Link key={index} to={obra.link} className="cardLink">
            <div className="populares-card">
              <img src={obra.img} alt={obra.titulo} className="populares-img" />
              <div className="populares-info">
                <span className="populares-nombre">{obra.titulo}</span>
                <span className="populares-precio">{obra.precio}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Populares;
