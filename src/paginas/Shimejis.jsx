import React, { useState } from "react";
import "./Shimejis.css";

export default function Shimejis() {
  const [mensaje, setMensaje] = useState("");

  const mascotas = [
    { nombre: "Logicat", imagen: "/images/BR03C.png" },
    { nombre: "Brainy", imagen: "/images/BR01C.png" },
    { nombre: "Lexi", imagen: "/images/BR05C.png" },
  ];

  const handleClick = () => {
    setMensaje("Próximamente...");
    setTimeout(() => setMensaje(""), 2000);
  };

  return (
    <div className="shimejis-container">
      <h1>¡Activa tus Shimejis!</h1>
      <div className="shimejis-grid">
        {mascotas.map((m, i) => (
          <div key={i} className="shimeji-card" onClick={handleClick}>
            <div className="shimeji-circle">
              <img src={m.imagen} alt={m.nombre} />
            </div>
            <p>{m.nombre}</p>
          </div>
        ))}
      </div>

      {/* Espacio reservado para el mensaje */}
      <div className="mensaje-placeholder">
        {mensaje && <div className="mensaje">{mensaje}</div>}
      </div>
    </div>
  );
}
