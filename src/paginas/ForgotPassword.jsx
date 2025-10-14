import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./forgotPassword.css";

export default function ForgotPassword() {
  const [correo, setCorreo] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validarCorreo = (correo) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMensaje("");
    setError("");

    if (!correo) {
      setError("Por favor, ingresa tu correo electrónico.");
      return;
    }

    if (!validarCorreo(correo)) {
      setError("Por favor, ingresa un correo válido.");
      return;
    }

    // 🔎 Buscar usuario en localStorage
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuario = usuarios.find((u) => u.correo === correo);

    if (!usuario) {
      setError("No existe una cuenta asociada a este correo.");
      return;
    }

    // ✉️ Simular envío de enlace o nueva contraseña
    setMensaje("Se ha enviado un enlace para restablecer tu contraseña al correo ingresado. 📧");

    // 🔁 Simulación: después de unos segundos redirige al login
    setTimeout(() => {
      navigate("/login");
    }, 3500);
  };

  return (
    <section className="forgot-container">
      <div className="forgot-card">
        <h1 className="forgot-title">¿Olvidaste tu contraseña?</h1>
        <p className="forgot-subtitle">No te preocupes, te ayudaremos a recuperarla 🐾</p>

        <form onSubmit={handleSubmit} className="forgot-form">
          {error && <p className="error-message">{error}</p>}
          {mensaje && <p className="success-message">{mensaje}</p>}

          <input
            type="email"
            placeholder="Ingresa tu correo electrónico"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            className={error ? "input-error" : ""}
          />

          <button type="submit" className="forgot-btn">
            Enviar enlace
          </button>
        </form>

        <div className="forgot-links">
          <a href="/login">Volver al inicio de sesión</a>
        </div>
      </div>
    </section>
  );
}
