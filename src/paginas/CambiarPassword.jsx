import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUsuarios } from "../context/UsuariosContext";
import "./CambiarPassword.css";

export default function CambiarPassword() {
  const { usuarioLogueado, updateUsuario } = useUsuarios();
  const [passwords, setPasswords] = useState({
    actual: "",
    nueva: "",
    confirmar: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!usuarioLogueado) {
      alert("Primero inicia sesión 🐾");
      navigate("/login");
    }
  }, [usuarioLogueado, navigate]);

  const handleChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!passwords.actual || !passwords.nueva || !passwords.confirmar) {
      alert("Por favor completa todos los campos.");
      return;
    }

    if (passwords.nueva !== passwords.confirmar) {
      alert("Las contraseñas no coinciden ❌");
      return;
    }

    const data = JSON.parse(localStorage.getItem("tienda_mascotas_full_users_v1"));
    const usuarios = data?.usuarios || [];
    const usuario = usuarios.find((u) => u.id === usuarioLogueado.id);

    if (!usuario) {
      alert("Usuario no encontrado ❌");
      return;
    }

    if (usuario.password !== passwords.actual) {
      alert("La contraseña actual es incorrecta ⚠️");
      return;
    }

    updateUsuario(usuario.id, { password: passwords.nueva });

    alert("Contraseña cambiada correctamente 🔒");
    navigate("/mi-cuenta");
  };

  if (!usuarioLogueado) return <p>Cargando...</p>;

  return (
    <section className="password-container">
      <div className="password-card">
        <h1>Cambiar Contraseña</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            name="actual"
            placeholder="Contraseña actual"
            value={passwords.actual}
            onChange={handleChange}
          />
          <input
            type="password"
            name="nueva"
            placeholder="Nueva contraseña"
            value={passwords.nueva}
            onChange={handleChange}
          />
          <input
            type="password"
            name="confirmar"
            placeholder="Confirmar nueva contraseña"
            value={passwords.confirmar}
            onChange={handleChange}
          />
          <div className="password-buttons">
            <button type="submit" className="guardar-btn">
              Guardar
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
