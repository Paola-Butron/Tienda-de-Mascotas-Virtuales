import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./EditarPerfil.css";

export default function EditarPerfil() {
  const [form, setForm] = useState({ nombre: "", apellido: "", correo: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
    if (!usuarioActivo) {
      alert("Primero inicia sesión 🐾");
      navigate("/login");
      return;
    }
    setForm({
      nombre: usuarioActivo.nombre || "",
      apellido: usuarioActivo.apellido || "",
      correo: usuarioActivo.correo || "",
    });
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.nombre || !form.apellido || !form.correo) {
      alert("Por favor completa todos los campos.");
      return;
    }

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const index = usuarios.findIndex(
      (u) => u.correo === JSON.parse(localStorage.getItem("usuarioActivo")).correo
    );

    if (index !== -1) {
      usuarios[index] = { ...usuarios[index], ...form };
      localStorage.setItem("usuarios", JSON.stringify(usuarios));
      localStorage.setItem("usuarioActivo", JSON.stringify(usuarios[index]));
      alert("Datos actualizados correctamente ✅");
      navigate("/mi-cuenta");
    } else {
      alert("Error: no se encontró el usuario en la base local.");
    }
  };

  return (
    <section className="editar-container">
      <div className="editar-card">
        <h1>Editar mis datos</h1>
        <form onSubmit={handleSubmit} className="editar-form">
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
            placeholder="Correo"
            value={form.correo}
            disabled
          />
          <div className="editar-buttons">
            <button type="submit" className="guardar-btn">Guardar cambios</button>
            <button type="button" className="cancelar-btn" onClick={() => navigate("/mi-cuenta")}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
