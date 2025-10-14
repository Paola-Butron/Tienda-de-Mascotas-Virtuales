import React from "react";
import { Link } from "react-router-dom";
import "./OrderComplete.css"; 

export default function OrderComplete() {
  return (
    <section className="card order-complete">
      <h1 className="order-title">¡Pedido completado!</h1>

      <img
        src="/images/gatito1.png"
        alt="Gatito agradecido"
        className="order-image"
      />

      <p className="order-text">
        Gracias por tu compra 🧡<br />
        Puedes revisar tus órdenes en la sección <strong>“Mi cuenta”</strong>.
      </p>

      <Link to="/" className="order-button">
        Volver al inicio
      </Link>
    </section>
  );
}