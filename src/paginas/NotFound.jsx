import React from "react";
import { useNavigate } from "react-router-dom";
import "./NotFound.css";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="notfound-container">
      <div className="notfound-content">
        <div className="notfound-image">
          <img src='/images/notfound.png' alt='Error 404'/>
        </div>
        <h1>Oh oh...</h1>
        <p>Parece que saliste de nuestro bosque 🌲</p>
        <button onClick={() => navigate("/")}>Regresar a Inicio</button>
      </div>
      <div className="notfound-bg"></div>
    </div>
  );
}
