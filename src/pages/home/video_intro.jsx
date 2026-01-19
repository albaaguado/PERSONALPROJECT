import React, { useRef, useEffect } from "react";
import "./video_intro.css";

export default function ResumenVideo() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      // Intentar reproducir cuando el video esté listo
      const handleCanPlay = () => {
        video.play().catch((error) => {
          console.log("Autoplay prevented:", error);
        });
      };

      // Intentar reproducir cuando haya suficiente datos cargados
      const handleLoadedData = () => {
        video.play().catch((error) => {
          console.log("Autoplay prevented on loaded data:", error);
        });
      };

      // Añadir listeners
      video.addEventListener("canplay", handleCanPlay);
      video.addEventListener("loadeddata", handleLoadedData);

      // Intentar reproducir inmediatamente
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.log("Initial autoplay prevented:", error);
        });
      }

      return () => {
        video.removeEventListener("canplay", handleCanPlay);
        video.removeEventListener("loadeddata", handleLoadedData);
      };
    }
  }, []);

  const handleVideoError = (e) => {
    console.error("Error loading video:", e);
  };

  return (
    <section className="resumen-video">
      <video
        ref={videoRef}
        className="resumen-video-player"
        src="/resumen.mp4"
        autoPlay
        loop
        controls
        playsInline
        onError={handleVideoError}
        preload="auto"
      />
      <div className="resumen-texto">
        <span className="texto-superior">Where stories sing</span>
        <br />
        <span className="texto-inferior">and memories begin</span>
      </div>
    </section>
  );
}
