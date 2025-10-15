import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Account.css";

export default function Account() {
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Esperar un momento para asegurarse de que el login haya guardado los datos
    const timer = setTimeout(() => {
      const data = JSON.parse(localStorage.getItem("tienda_mascotas_full_users_v1"));

      if (!data || !data.usuarioLogueado) {
        navigate("/login");
      } else {
        setUsuario(data.usuarioLogueado);
      }
    }, 100); // pequeño retraso de 0.1s

    return () => clearTimeout(timer);
  }, [navigate]);

  const handleLogout = () => {
    const data = JSON.parse(localStorage.getItem("tienda_mascotas_full_users_v1"));
    if (data) {
      // eliminar el usuario logueado
      delete data.usuarioLogueado;
      localStorage.setItem("tienda_mascotas_full_users_v1", JSON.stringify(data));
    }

    alert("Has cerrado sesión 🐾");
    navigate("/");
  };

  if (!usuario) {
    return (
      <div className="account-loading">
        <p>🐶 Cargando tu cuenta...</p>
      </div>
    );
  }

  return (
    <section className="account-container">
      <div className="account-card">
        <h1>Mi Cuenta</h1>
        <p>
          <strong>Nombre:</strong> {usuario.nombre}
        </p>
        <p>
          <strong>Apellido:</strong> {usuario.apellido}
        </p>
        <p>
          <strong>Correo:</strong> {usuario.email}
        </p>

        <div className="account-actions">
          <button
            onClick={() => navigate("/editar-perfil")}
            className="btn editar"
          >
            Editar datos
          </button>
          <button
            onClick={() => navigate("/cambiar-password")}
            className="btn password"
          >
            Cambiar contraseña
          </button>
          <button onClick={handleLogout} className="btn logout">
            Cerrar sesión
          </button>
        </div>
      </div>
    </section>
  );
}
