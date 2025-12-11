import React from "react";
import "./news.css";

// Importa aquí tus imágenes reales
import ragtime from "../../img/noticias/ragtime.jpg";
import wicked from "../../img/noticias/colmandomingo.webp";
import purpleRain from "../../img/noticias/purple rain.webp";
import schmigadoon from "../../img/noticias/alex y sara.jpg";

const newsData = [
  {
    title: "Exclusive first look at highly anticipated Ragtime musical revival on Broadway",
    text: "The wheels of a dream are turning in the first production photos of the Lincoln Center Theater musical.",
    img: ragtime,
    link: "https://ew.com/exclusive-first-look-ragtime-musical-revival-broadway-11830255?",
  },
  {
    title: "Bay Area theatre star joins ‘Wicked’ cast",
    text: "Colman Domingo is following the yellow brick road to his next big role.",
    img: wicked,
    link: "https://people.com/alex-brightman-and-sara-chase-to-lead-schmigadoon-broadway-exclusive-11830004?",
  },
  {
    title: '"Purple Rain" musical takes the stage in Minneapolis',
    text: "The “Purple Rains” musical begins its run in Minneapolis Thursday.",
    img: purpleRain,
    link: "https://www.axios.com/local/twin-cities/2025/10/16/purple-rain-musical-prince-broadway-minneapolis-ticktets?",
  },
  {
    title: "Alex Brightman and Sara Chase to Lead Broadway Adaptation of Schmigadoon!",
    text: "Previews begin at the Nederlander Theatre on April 4, 2026.",
    img: schmigadoon,
    link: "https://people.com/alex-brightman-and-sara-chase-to-lead-schmigadoon-broadway-exclusive-11830004?",
  },
];

export default function NewsFeatures() {
  return (
    <section id="news" className="news-section">
      <h2 className="news-title">NEWS AND FEATURES</h2>

      <div className="news-container">
        {/* Noticia grande (la primera) */}
        <a href={newsData[0].link} className="news-item large" target="_blank" rel="noopener noreferrer">
          <img src={newsData[0].img} alt={newsData[0].title} className="news-img" />
          <div className="news-text">
            <h3 className="news-headline">{newsData[0].title}</h3>
            <p className="news-description">{newsData[0].text}</p>
          </div>
        </a>

        {/* Noticias pequeñas (resto) */}
        <div className="news-side">
          {newsData.slice(1).map((item, index) => (
            <a key={index} href={item.link} className="news-item small" target="_blank" rel="noopener noreferrer">
              <img src={item.img} alt={item.title} className="news-img" />
              <div className="news-text">
                <h3 className="news-headline">{item.title}</h3>
                <p className="news-description">{item.text}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
