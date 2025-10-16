import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUsuarios } from "../context/UsuariosContext";
import "./EditarPerfil.css";

export default function EditarPerfil() {
  const { usuarioLogueado, updateUsuario, logout } = useUsuarios();
  const [form, setForm] = useState({ nombre: "", apellido: "", correo: "" });
  const navigate = useNavigate();

  useEffect(() => {
    if (!usuarioLogueado) {
      alert("Primero inicia sesión 🐾");
      navigate("/login");
      return;
    }

    setForm({
      nombre: usuarioLogueado.nombre || "",
      apellido: usuarioLogueado.apellido || "",
      correo: usuarioLogueado.email || "",
    });
  }, [usuarioLogueado, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.nombre || !form.apellido || !form.correo) {
      alert("Por favor completa todos los campos.");
      return;
    }

    updateUsuario(usuarioLogueado.id, {
      nombre: form.nombre.trim(),
      apellido: form.apellido.trim(),
    });

    alert("Datos actualizados correctamente ✅");
    navigate("/mi-cuenta");
  };

  const handleLogout = () => {
    logout(); 
    alert("Has cerrado sesión 🐾");
    setTimeout(() => navigate("/"), 100);
  };

  if (!usuarioLogueado) return null;

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
          <input type="email" placeholder="Correo" value={form.correo} disabled />

          <div className="editar-buttons">
            <button type="submit" className="guardar-btn">
              Guardar cambios
            </button>
            <button
              type="button"
              className="cancelar-btn"
              onClick={() => navigate("/mi-cuenta")}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
