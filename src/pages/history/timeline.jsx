import React from "react";
import "./timeline.css";

import blackCrook from "../../img/musicales/portadas/blackcrook_vertical.webp";
import oklahoma from "../../img/musicales/portadas/oklahoma_vertical.jpg";
import westside from "../../img/musicales/portadas/westsidestory_vertical.webp";
import miserables from "../../img/musicales/portadas/miserables_vertical.jpg";
import phantom from "../../img/musicales/portadas/phantom_vertical.jpg";
import lionking from "../../img/musicales/portadas/lionking_vertical.webp";
import wicked from "../../img/musicales/portadas/wicked_vertical.jpg";
import hamilton from "../../img/musicales/portadas/hamilton_vertical.jpeg";

export default function Timeline() {
  const events = [
    {
      year: "1866",
      title: "The Black Crook",
      description: "Considerado el primer musical moderno.",
      img: blackCrook,
      side: "left"
    },
    {
      year: "1943",
      title: "Oklahoma!",
      description: "Música, historia y danza unidas por primera vez.",
      img: oklahoma,
      side: "right"
    },
    {
      year: "1957",
      title: "West Side Story",
      description: "Coreografías modernas y trama mágica.",
      img: westside,
      side: "left"
    },
    {
      year: "1980",
      title: "Les Misérables",
      description: "Éxito mundial basado en la novela de Victor Hugo.",
      img: miserables,
      side: "right"
    },
    {
      year: "1986",
      title: "Phantom of the Opera",
      description: "Musical más longevo de Broadway.",
      img: phantom,
      side: "left"
    },
    {
      year: "1994",
      title: "The Lion King",
      description: "Adaptación teatral de Disney muy innovadora.",
      img: lionking,
      side: "right"
    },
    {
      year: "2003",
      title: "Wicked",
      description: "Reinterpretación del Mago de Oz (mucho éxito).",
      img: wicked,
      side: "left"
    },
    {
      year: "2015",
      title: "Hamilton",
      description: "Revolucionó el género. Mezcla historia, rap y hiphop.",
      img: hamilton,
      side: "right"
    }
  ];

  return (
    <div className="timeline-wrapper">
      <div className="timeline">
        {events.map((event, index) => (
          <div key={index} className={`container ${event.side}`}>
            <div className="content">
              <h2>{event.year}</h2>
              <img src={event.img} alt={event.title} className="event-img" />
              <h3>{event.title}</h3>
              <p>{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
