import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUsuarios } from "../context/UsuariosContext";
import "./Register.css";

export default function Register() {
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { register } = useUsuarios();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.nombre || !form.apellido || !form.email || !form.password) {
      alert("Por favor completa todos los campos.");
      return;
    }

    try {
      register({
        nombre: form.nombre.trim(),
        apellido: form.apellido.trim(),
        email: form.email.trim(),
        password: form.password,
      });
      alert("¡Registro exitoso! Has sido logueado.");
      setForm({ nombre: "", apellido: "", email: "", password: "" });
      navigate("/mi-cuenta");
    } catch (err) {
      alert(err.message || "Error al registrarse");
    }
  };

  return (
    <section className="register-container">
      <div className="register-card">
        <h1>Crear cuenta</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nombre"
            value={form.nombre}
            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Apellido"
            value={form.apellido}
            onChange={(e) => setForm({ ...form, apellido: e.target.value })}
            required
          />
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
          <button type="submit" className="register-btn">
            Registrarse
          </button>
        </form>

        <div style={{ marginTop: 12 }}>
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
        </div>
      </div>
    </section>
  );
}
