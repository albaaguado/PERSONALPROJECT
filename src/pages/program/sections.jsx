import React, { useState } from "react";
import "./sections.css";
import { Link } from "react-router-dom";

// Imágenes de ejemplo (pon tus rutas relativas)
import show1 from "../../img/musicales/portadas/estrenos/boop_vertical.jpg";
import show2 from "../../img/musicales/portadas/estrenos/justintime_vertical.jpg";
import show3 from "../../img/musicales/portadas/estrenos/piratesofpenzance_vertical.jpg";
import show4 from "../../img/musicales/portadas/estrenos/thelast5years_vertical.jpg";
import show5 from "../../img/musicales/portadas/estrenos/thequeenofversailles_vertical.png";
import nav1 from "../../img/musicales/portadas/navidad/carol_vertical.jpg";
import nav2 from "../../img/musicales/portadas/navidad/elf_vertical.webp";
import nav3 from "../../img/musicales/portadas/navidad/grinch_vertical.jpeg";
import nav4 from "../../img/musicales/portadas/navidad/holidayinn_vertical.jpg";
import nav5 from "../../img/musicales/portadas/navidad/whitechris_vertical.jpg";   

export default function UpcomingShowsSection() {
  const [filter, setFilter] = useState("christmas");

  const shows = [
    { title: "A CHRISTMAS CAROL", price: "from 80€", img: nav1, category: "christmas", link: "/info/chr/info_christmascarol" },
    { title: "ELF", price: "from 90€", img: nav2, category: "christmas", link: "/info/chr/info_elf" },
    { title: "THE GRINCH STOLE THE CHRISTMAS", price: "from 75€", img: nav3, category: "christmas", link: "/info/chr/info_grinch" },
    { title: "HOLIDAY INN", price: "from 70€", img: nav4, category: "christmas", link: "/info/chr/info_holidayinn" },
    { title: "WHITE CHRISTMAS", price: "from 70€", img: nav5, category: "christmas", link: "/info/chr/info_whitechristmas" },
    { title: "BOOP!", price: "from 75€", img: show1, category: "premieres", link: "/info/pr/info_boop" },
    { title: "JUST IN TIME", price: "from 75€", img: show2, category: "premieres", link: "/info/pr/info_justintime" },
    { title: "PIRATES OF PENZANE", price: "from 65€", img: show3, category: "premieres", link: "/info/pr/info_pirates" },
    { title: "THE LAST 5 YEARS", price: "from 85€", img: show4, category: "premieres", link: "/info/pr/info_5years" },
    { title: "THE QUEEN OF VERSAILLES", price: "from 80€", img: show5, category: "premieres", link: "/info/pr/info_queen" }
  ];

  const filteredShows = shows.filter(show => show.category === filter).slice(0, 5);

  return (
    <div id="sections" className="upcomingShowsSection">
      <div className="sectionBackground" />

      {/* Título grande */}
      <div className="sectionTitle">Upcoming shows</div>

      {/* Botones de filtro */}
      <div className="filterButtons">
        <button
          className={filter === "christmas" ? "active" : ""}
          onClick={() => setFilter("christmas")}
        >
          christmas specials
        </button>
        <button
          className={filter === "premieres" ? "active" : ""}
          onClick={() => setFilter("premieres")}
        >
          premieres
        </button>
      </div>

      {/* Grid de shows */}
      <div className="showsGrid">
        {filteredShows.map((show, index) => (
          <Link key={index} to={show.link} className="showCardLink" aria-label={show.title}>
            <div className="showCard">
              <img src={show.img} alt={show.title} className="showImage" />
              <div className="showTitle">{show.title}</div>
              <div className="showPrice">{show.price}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
