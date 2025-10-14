import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

export default function Register() {
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    contraseña: "",
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // 🔹 Validación
    if (!form.nombre || !form.apellido || !form.correo || !form.contraseña) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    // 🔹 Obtener usuarios existentes o crear array vacío
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // 🔹 Verificar si el correo ya está registrado
    const existe = usuarios.some((u) => u.correo === form.correo);
    if (existe) {
      alert("Este correo ya está registrado. Intenta con otro.");
      return;
    }

    // 🔹 Agregar nuevo usuario
    usuarios.push(form);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    // 🔹 Guardar usuario activo para login automático
    localStorage.setItem("usuarioActivo", JSON.stringify(form));

    alert("¡Registro exitoso! 🎉");
    navigate("/mi-cuenta");
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
          />
          <input
            type="text"
            placeholder="Apellido"
            value={form.apellido}
            onChange={(e) => setForm({ ...form, apellido: e.target.value })}
          />
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
          <button type="submit" className="register-btn">Registrarse</button>
        </form>
      </div>
    </section>
  );
}
