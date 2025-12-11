import React from "react";
import { Link } from "react-router-dom";
import "./upcomingshows.css";

// Importar imágenes
import lesMiserables from "../../img/musicales/portadas/miserables_vertical.jpg";
import victorvictoria from "../../img/musicales/portadas/victorovictoria_vertical.jpg";
import wicked from "../../img/musicales/portadas/wicked_vertical.jpg";
import westside from "../../img/musicales/portadas/westsidestory_vertical.webp";
import aladin from "../../img/musicales/portadas/aladdin_vertical.webp";
import cabaret from "../../img/musicales/portadas/cabaret_vertical.jpg";
import lionking from "../../img/musicales/portadas/lionking_vertical.webp";
import grease from "../../img/musicales/portadas/grease_vertical.jpg";
import mammamia from "../../img/musicales/portadas/mammamia_vertical.jpg";
import Oz from "../../img/musicales/portadas/oz_vertical.jpg";
import kinky from "../../img/musicales/portadas/kinkiboots_vertical.jpg";
import moulin from "../../img/musicales/portadas/moulinrouge_vertical.jpg";
import hamilton from "../../img/musicales/portadas/hamilton_vertical.jpeg";
import chicago from "../../img/musicales/portadas/chicago_vertical.jpg";
import marypoppins from "../../img/musicales/portadas/marypoppins_vertical.jpg";

export default function UpcomingShows({ lastMinuteFilter = false }) {
  const showsRows = [
    [
      { title: "LES MISÉRABLES", price: "from 80€", img: lesMiserables, link: "../info/info_lesmiserables" },
      { title: "VICTOR O VICTORIA", price: "from 90€", img: victorvictoria, link: "../info/info_victorvictoria" },
      { title: "WICKED", price: "from 75€", img: wicked, link: "../info/info_wicked" },
      { title: "WEST SIDE STORY", price: "from 70€", img: westside, link: "../info/info_westsidestory" },
      { title: "ALADDIN", price: "from 65€", img: aladin, link: "../info/info_aladdin" }
    ],
    [
      { title: "CABARET", price: "from 70€", img: cabaret, link: "../info/info_cabaret" },
      { title: "THE LION KING", price: "from 85€", img: lionking, link: "../info/info_lionking" },
      { title: "GREASE", price: "from 80€", img: grease, link: "../info/info_grease" },
      { title: "MAMMA MIA!", price: "from 65€", img: mammamia, link: "../info/info_mammamia" },
      { title: "THE WIZARD OF OZ", price: "from 75€", img: Oz, link: "../info/info_oz" }
    ],
    [
      { title: "KINKY BOOTS", price: "from 60€", img: kinky, link: "../info/info_kinki" },
      { title: "MOULIN ROUGE", price: "from 75€", img: moulin, link: "../info/info_moulin" },
      { title: "MARY POPPINS", price: "from 85€", img: marypoppins, link: "../info/info_poppins" },
      { title: "HAMILTON", price: "from 70€", img: hamilton, link: "../info/info_hamilton" },
      { title: "CHICAGO", price: "from 95€", img: chicago, link: "../info/info_chicago" }
    ]
  ];

  // Si venimos desde el bloque LAST MINUTE, solo mostrar 3 musicales concretos
  const rowsToRender = lastMinuteFilter
    ? showsRows
        .map(row =>
          row.filter(show =>
            ["LES MISÉRABLES", "VICTOR O VICTORIA", "MAMMA MIA!"].includes(show.title)
          )
        )
        .filter(row => row.length > 0)
    : showsRows;

  return (
    <div id="upcomingshows" className="upcomingShowsContainer">
      <div className="upcomingShowsTitle">Shows in November</div>
      {rowsToRender.map((row, rowIndex) => (
        <div key={rowIndex} className="showsGrid">
          {row.map((show, idx) => (
            <Link key={idx} to={show.link} className="cardLink">
              <div className="showCard">
                <img src={show.img} alt={show.title} className="showImage" />
                <div className="showTitleContainer">
                  <span className="showTitle">{show.title}</span>
                  <span className="showPrice">{show.price}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
}
