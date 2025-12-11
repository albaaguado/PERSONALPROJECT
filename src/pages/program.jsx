import React from "react";
import "./program.css";
import { useLocation } from "react-router-dom";
import IndexProgram from "./program/indexprogram";
import UpcomingShows from "./program/upcomingshows";
import UpcomingShowsSection from "./program/sections";


export default function Programming() {
  const location = useLocation();
  const lastMinuteFilter = location.state?.lastMinuteFilter || false;

  return (
    <div>
      {/* Bloque de fondo detrás del título */}
      <div className="title-background">
        <h1 className="main-title">PROGRAMMING OF</h1>
        <h2 className="subtitle">UPCOMING SHOWS</h2>
      </div>
        <IndexProgram />

      <div className="content">
        <UpcomingShows lastMinuteFilter={lastMinuteFilter} />
        <UpcomingShowsSection />
      </div>
    </div>
  );
}
