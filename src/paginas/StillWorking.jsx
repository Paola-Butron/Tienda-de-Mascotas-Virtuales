import React from "react";
import { useNavigate } from "react-router-dom";
import "./StillWorking.css";

export default function Stillworking() {
  const navigate = useNavigate();

  return (
    <div className="stillworking-container">
      <div className="stillworking-content">
        <div className="stillworking-image">
          <img src='/images/stillworking.png' alt='Trabajando'/>
        </div>
        <h1>Ups...</h1>
        <p>Aún estamos trabajando para ofrecerte un mejor servicio 🛠</p>
        <button onClick={() => navigate("/")}>Regresar a Inicio</button>
      </div>
      <div className="stillworking-bg"></div>
    </div>
  );
}
