import React from "react";
import "./home.css"; 
import ResumenVideo from "./home/video_intro";
import Indice from "./home/indice";
import LastMinute from "./home/last_minute";
import Live from "./home/live";
import Populares from "./home/populares";
import News from "./home/news";

const Home = () => {
  return (
    <div className="home-container">
      <ResumenVideo />
      <Indice />
      <LastMinute />
      <Live />
      <Populares />
      <News />
    </div>
  );
};

export default Home;

