import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Account.css";

export default function Account() {
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));

    if (!usuarioActivo) {
      navigate("/login");
    } else {
      setUsuario(usuarioActivo);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("usuarioActivo");
    alert("Has cerrado sesión 🐾");
    navigate("/");
  };

  if (!usuario) {
    return <p>Cargando tu cuenta...</p>;
  }

  return (
    <section className="account-container">
      <div className="account-card">
        <h1>Mi Cuenta</h1>
        <p><strong>Nombre:</strong> {usuario.nombre}</p>
        <p><strong>Apellido:</strong> {usuario.apellido}</p>
        <p><strong>Correo:</strong> {usuario.correo}</p>

        <div className="account-actions">
          <button onClick={() => navigate("/editar-perfil")} className="btn editar">
            Editar datos
          </button>
          <button onClick={() => navigate("/cambiar-password")} className="btn password">
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
