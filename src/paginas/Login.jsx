import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

export default function Login() {
  const [form, setForm] = useState({ correo: "", contraseña: "" });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const usuarioEncontrado = usuarios.find(
      (u) => u.correo === form.correo && u.contraseña === form.contraseña
    );

    if (usuarioEncontrado) {
      localStorage.setItem("usuarioActivo", JSON.stringify(usuarioEncontrado));
      alert(`¡Bienvenido, ${usuarioEncontrado.nombre}! `);
      navigate("/mi-cuenta");
    } else {
      alert("Correo o contraseña incorrectos.");
    }
  };

  return (
    <section className="login-container">
      <div className="login-card">
        <h1 className="login-title">Iniciar Sesión</h1>
        <p className="login-subtitle">Bienvenido a PetShop 🐾</p>

        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="email"
            placeholder="Correo electrónico"
            value={form.correo}
            onChange={(e) => setForm({ ...form, correo: e.target.value })}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={form.contraseña}
            onChange={(e) => setForm({ ...form, contraseña: e.target.value })}
          />
          <button type="submit" className="login-btn">Ingresar</button>
        </form>

        <div className="login-links">
          <a href="/register">Crear cuenta</a>
          <a href="/forgot-password">¿Olvidaste tu contraseña?</a>
        </div>
      </div>
    </section>
  );
}
