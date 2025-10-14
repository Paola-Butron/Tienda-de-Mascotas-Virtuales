import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CambiarPassword.css";

export default function CambiarPassword() {
  const [passwords, setPasswords] = useState({ actual: "", nueva: "", confirmar: "" });
  const navigate = useNavigate();
  const [usuarioActivo, setUsuarioActivo] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("usuarioActivo"));
    if (!user) {
      alert("Primero inicia sesión 🐾");
      navigate("/login");
      return;
    }
    setUsuarioActivo(user);
  }, [navigate]);

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

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const index = usuarios.findIndex((u) => u.correo === usuarioActivo.correo);

    if (index === -1) {
      alert("Usuario no encontrado.");
      return;
    }

    if (usuarios[index].contraseña !== passwords.actual) {
      alert("La contraseña actual es incorrecta ⚠️");
      return;
    }

    usuarios[index].contraseña = passwords.nueva;
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    localStorage.setItem("usuarioActivo", JSON.stringify(usuarios[index]));

    alert("Contraseña cambiada correctamente 🔒");
    navigate("/mi-cuenta");
  };

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
          <button type="submit">Guardar</button>
          <button type="button" onClick={() => navigate("/mi-cuenta")}>
            Cancelar
          </button>
        </form>
      </div>
    </section>
  );
}
