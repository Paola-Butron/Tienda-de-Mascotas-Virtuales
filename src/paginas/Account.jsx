import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUsuarios } from "../context/UsuariosContext";
import "./Account.css";

export default function Account() {
  const { usuarioLogueado, ordenes, logout } = useUsuarios();
  const [ordenesPagina, setOrdenesPagina] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  const ITEMS_POR_PAGINA = 5;

  useEffect(() => {
    if (!usuarioLogueado) {
      navigate("/login");
      return;
    }
    setUsuario(usuarioLogueado);
  }, [usuarioLogueado, navigate]);

  const ordenesUsuario = ordenes.filter(
    (o) => o.usuarioId === usuario?.id
  );

  const totalPaginas = Math.ceil(ordenesUsuario.length / ITEMS_POR_PAGINA);

  useEffect(() => {
    const start = (paginaActual - 1) * ITEMS_POR_PAGINA;
    const end = start + ITEMS_POR_PAGINA;
    setOrdenesPagina(ordenesUsuario.slice(start, end));
  }, [paginaActual, ordenesUsuario]);

  const handleLogout = () => {
    logout();
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
        <p><strong>Nombre:</strong> {usuario.nombre}</p>
        <p><strong>Apellido:</strong> {usuario.apellido}</p>
        <p><strong>Correo:</strong> {usuario.email}</p>

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

      <div className="account-orders">
        <h2>📦 Mis órdenes</h2>

        {ordenesUsuario.length === 0 ? (
          <p>No tienes órdenes registradas aún 🐾</p>
        ) : (
          <>
            <table className="orders-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Fecha</th>
                  <th>Estado</th>
                  <th>Total</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {ordenesPagina.map((orden) => (
                  <tr key={orden.id}>
                    <td>{orden.id}</td>
                    <td>{new Date(orden.fecha).toLocaleDateString()}</td>
                    <td>{orden.estado}</td>
                    <td>S/{orden.total}</td>
                    <td>
                      <button
                        className="btn ver-detalle"
                        onClick={() => navigate(`/orden/${orden.id}`)} 
                      >
                        Ver detalle
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="paginacion">
              <button
                disabled={paginaActual === 1}
                onClick={() => setPaginaActual((p) => p - 1)}
              >
                Anterior
              </button>
              <span>
                Página {paginaActual} de {totalPaginas}
              </span>
              <button
                disabled={paginaActual === totalPaginas}
                onClick={() => setPaginaActual((p) => p + 1)}
              >
                Siguiente 
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
