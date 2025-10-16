import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUsuarios } from "../context/UsuariosContext";
import "./forgotPassword.css";

export default function ForgotPassword() {
  const [correo, setCorreo] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { forgotPassword } = useUsuarios(); 

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

    const existe = forgotPassword(correo);

    if (!existe) {
      setError("No existe una cuenta asociada a este correo.");
      return;
    }

    setMensaje(
      "Se ha enviado un enlace para restablecer tu contraseña al correo ingresado. 📧"
    );

    setTimeout(() => {
      navigate("/login");
    }, 3500);
  };

  return (
    <section className="forgot-container">
      <div className="forgot-card">
        <h1 className="forgot-title">¿Olvidaste tu contraseña?</h1>
        <p className="forgot-subtitle">
          No te preocupes, te ayudaremos a recuperarla 🐾
        </p>

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
