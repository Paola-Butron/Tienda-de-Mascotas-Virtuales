import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUsuarios } from '../context/UsuariosContext';
import { useProductos } from '../context/ProductosContext';
import "./Navbar.css";

export default function Navbar() {
  const { usuarioLogueado, logout } = useUsuarios();
  const { carrito } = useProductos();
  const navigate = useNavigate();
  const [q, setQ] = useState('');

  const totalItems = carrito.reduce((s, i) => s + (i.cantidad || 0), 0);

  const onSearch = (e) => {
    e.preventDefault();
    navigate('/buscar?q=' + encodeURIComponent(q));
  };

  return (
    <header className="navbar">
      <div className="nav-inner">
        <div className="brand">
          <Link to="/">
            <div className="logo-emoji">🐾</div>
            <div className="brand-text">
              <span className="brand-name">PetShop</span>
              <span className="brand-subtitle">Tu tienda de mascotas virtual</span>
            </div>
          </Link>
        </div>

        <form onSubmit={onSearch} className="buscador">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar..."
          />
          <button type="submit">Buscar</button>
        </form>

        <nav className="nav-links">
          <Link to="/productos">Productos</Link>
          <Link to="/carrito">Carrito ({totalItems})</Link>
          {usuarioLogueado ? (
            <>
              <Link to="/mi-cuenta">Mi cuenta</Link>
              <button onClick={logout} className="link-btn">Salir</button>
            </>
          ) : (
            <Link to="/login">Iniciar sesión</Link>
          )}
          <Link to="/admin">Admin</Link>
        </nav>
      </div>
    </header>
  );
}
