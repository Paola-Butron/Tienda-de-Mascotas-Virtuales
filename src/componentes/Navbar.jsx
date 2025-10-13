import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUsuarios } from "../context/UsuariosContext";
import { useProductos } from "../context/ProductosContext";
import "./Navbar.css";

export default function Navbar() {
  const { usuarioLogueado, logout } = useUsuarios();
  const {
    carrito = [],
    categorias = [],
    filtrarPorCategoria = () => {},
    cambiarCantidad = () => {},
    quitarDelCarrito = () => {}
  } = useProductos();

  const navigate = useNavigate();
  const [q, setQ] = useState("");

  const totalItems = carrito.reduce((s, i) => s + (i.cantidad || 0), 0);

  const onSearch = (e) => {
    e.preventDefault();
    if (!q.trim()) return;
    navigate("/buscar?q=" + encodeURIComponent(q));
    setQ("");
  };

  const handleCategoriaClick = (cat) => {
    filtrarPorCategoria(cat);
    navigate("/productos");
  };

  const handleSpecialView = (view) => {
    navigate(`/productos?view=${encodeURIComponent(view)}`);
  };

  return (
    <header className="navbar">
      <div className="nav-inner container">
        {/* LEFT: Logo */}
        <div className="nav-left">
          <Link to="/" className="brand-link" aria-label="Inicio">
            <div className="logo-emoji">🐾</div>
            <div className="brand-text">
              <span className="brand-name">Kozzy</span>
              <span className="brand-subtitle">Mascotas virtuales</span>
            </div>
          </Link>
        </div>

        {/* CENTER: buscar + menú */}
        <div className="nav-center-wrapper">
          <div className="nav-center">
            {/* Buscar */}
            <form onSubmit={onSearch} className="buscador" role="search" aria-label="Buscar productos">
              <input
                aria-label="Buscar"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Buscar..."
              />
              <button type="submit" className="btn small">Buscar</button>
            </form>

            {/* Menú */}
            <nav className="nav-links" aria-label="Navegación principal">
              {/* Productos */}
              <div className="menu-item has-dropdown products-dropdown">
                <button className="menu-btn">
                  Productos <span className="caret">▾</span>
                </button>
                <div className="dropdown dropdown-products">
                  <div className="dropdown-grid">
                    <div className="col">
                      <h4>Novedades</h4>
                      <ul>
                        <li><button className="link-like" onClick={() => handleSpecialView("ofertas")}>Ofertas Semanales</button></li>
                        <li><button className="link-like" onClick={() => handleSpecialView("ventas")}>Los más vendidos</button></li>
                        <li><button className="link-like" onClick={() => handleSpecialView("lujo")}>Los más lujosos</button></li>
                      </ul>
                    </div>
                    <div className="col">
                      <h4>Categorías</h4>
                      <ul>
                        {["Brainy", "Techy", "Cuddly", "Otros"].map((c) => (
                          <li key={c}>
                            <button className="link-like" onClick={() => handleCategoriaClick(c)}>{c}</button>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="col">
                      <h4>Accesorios</h4>
                      <ul>
                        {["Sombreros", "Ropa", "Juguetes", "Comida"].map((a) => (
                          <li key={a}>
                            <button className="link-like" onClick={() => navigate(`/productos?accessorio=${encodeURIComponent(a)}`)}>
                              {a}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Carrito */}
              <div className="menu-item has-dropdown cart-dropdown">
                <button className="menu-btn">
                  Carrito <span className="caret">▾</span>
                </button>
                <div className="dropdown dropdown-cart">
                  <div className="cart-list">
                    {carrito.length === 0 ? (
                      <div className="cart-empty">Tu carrito está vacío</div>
                    ) : (
                      <>
                        <ul>
                          {carrito.map(item => (
                            <li key={item.id} className="cart-item">
                              <img src={item.imagenUrl || "//Aqui debe ir la direccion de tu imagen"} alt={item.nombre} />
                              <div className="cart-info">
                                <strong>{item.nombre}</strong>
                                <div className="cart-controls">
                                  <label>
                                    Cant:
                                    <input
                                      type="number"
                                      min="1"
                                      value={item.cantidad || 1}
                                      onChange={(e) => cambiarCantidad(item.id, Number(e.target.value || 1))}
                                    />
                                  </label>
                                  <button className="link-remove" onClick={() => quitarDelCarrito(item.id)}>Quitar</button>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                        <div className="cart-actions">
                          <Link to="/carrito" className="btn">Ver carrito</Link>
                          <Link to="/checkout" className="btn alt">Pagar</Link>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Diversión */}
              <div className="menu-item has-dropdown fun-dropdown">
                <button className="menu-btn">
                  Diversión <span className="caret">▾</span>
                </button>
                <div className="dropdown dropdown-fun">
                  <div className="fun-grid">
                    <Link to="/pomodoro" className="fun-card">
                      <div className="fun-img" style={{ backgroundImage: "url('//Aqui debe ir la direccion de tu imagen')" }}>
                        <div className="fun-caption">Pomodoro</div>
                      </div>
                    </Link>
                    <Link to="/shimejis" className="fun-card">
                      <div className="fun-img" style={{ backgroundImage: "url('//Aqui debe ir la direccion de tu imagen')" }}>
                        <div className="fun-caption">Shimejis</div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </div>

        {/* RIGHT: Login */}
        <div className="nav-right">
          {usuarioLogueado ? (
            <button onClick={logout} className="btn">Salir</button>
          ) : (
            <Link to="/login" className="btn">Iniciar sesión</Link>
          )}
        </div>
      </div>
    </header>
  );
}
