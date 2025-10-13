import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; 
import "./login.css";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError("Por favor, ingresa un correo válido.");
      return;
    }

    if (form.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    const data = JSON.parse(localStorage.getItem("tienda_mascotas_full_users_v1")) || {};
    const usuarios = data.usuarios || [];
    const usuarioEncontrado = usuarios.find(
      (u) => u.email === form.email && u.password === form.password
    );

    if (usuarioEncontrado) {
      localStorage.setItem(
        "tienda_mascotas_full_users_v1",
        JSON.stringify({ ...data, usuarioLogueado: usuarioEncontrado })
      );
      alert(`Bienvenido, ${usuarioEncontrado.nombre}! 😺`);
      navigate("/");
    } else {
      setError("Correo o contraseña incorrectos.");
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
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          {error && <p className="error-text">{error}</p>}

          <button type="submit" className="login-btn">
            Ingresar
          </button>
        </form>

        <div className="login-links">
          <Link to="/register">Crear cuenta</Link> 
          <Link to="/forgot-password">¿Olvidaste tu contraseña?</Link> 
        </div>
      </div>
    </section>
  );
}
