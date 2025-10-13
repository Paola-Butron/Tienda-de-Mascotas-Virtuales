import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.email === "" || form.password === "") {
      alert("Por favor, completa todos los campos.");
      return;
    }
    alert(`Bienvenido, ${form.email}! 😺`);
    navigate("/");
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
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <button type="submit" className="login-btn">
            Ingresar
          </button>
        </form>

        <div className="login-links">
          <a href="/register">Crear cuenta</a>
          <a href="/forgot-password">¿Olvidaste tu contraseña?</a>
        </div>
      </div>
    </section>
  );
}
