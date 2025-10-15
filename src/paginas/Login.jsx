import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUsuarios } from "../context/UsuariosContext";
import "./login.css";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { login } = useUsuarios();

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const usuario = login({
        email: form.email.trim(),
        password: form.password,
      });
      alert(`¡Bienvenido, ${usuario.nombre || usuario.email}!`);
      navigate("/mi-cuenta");
    } catch (err) {
      alert(err.message || "Credenciales inválidas");
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
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <button type="submit" className="login-btn">Ingresar</button>
        </form>

        <div className="login-links">
          <Link to="/register">Crear cuenta</Link>
          <Link to="/forgot-password">¿Olvidaste tu contraseña?</Link>
        </div>
      </div>
    </section>
  );
}
