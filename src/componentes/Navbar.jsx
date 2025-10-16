import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUsuarios } from "../context/UsuariosContext";
import { useProductos } from "../context/ProductosContext";
import "./Navbar.css";

export default function Navbar() {
  const { usuarioLogueado, logout } = useUsuarios();
  const {
    productos = [],
    carrito = [],
    categorias = [],
    cambiarCantidad = () => {},
    quitarDelCarrito = () => {},
  } = useProductos();

  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [mostrarResultados, setMostrarResultados] = useState(false);
  const [usuario, setUsuario] = useState(usuarioLogueado); 

  useEffect(() => {
    setUsuario(usuarioLogueado);
  }, [usuarioLogueado]);

  const totalItems = carrito.reduce((s, i) => s + (i.cantidad || 0), 0);

  const resultados = q.trim()
    ? productos.filter((p) => {
        const nombre = String(p?.nombre || "").toLowerCase();
        const query = q.toLowerCase();
        return nombre.startsWith(query);
      })
    : [];

  const handleCategoriaClick = (cat) => {
    navigate(`/productos?categoria=${encodeURIComponent(cat)}`);
    setMostrarResultados(false);
  };

  const handleSpecialView = (view) => {
    if (view === "ofertas") {
      navigate("/productos?ofertas=true");
    } else {
      navigate(`/productos?view=${encodeURIComponent(view)}`);
    }
    setMostrarResultados(false);
  };

  const handleProductoClick = (id) => {
    navigate(`/productos/${id}`);
    setQ("");
    setMostrarResultados(false);
  };

  const handleLogout = () => {
    logout(); 
    setUsuario(null); 
    navigate("/");
  };

  return (
    <header className="navbar">
      <div className="nav-inner container">
        <div className="nav-left">
          <Link to="/" className="brand-link" aria-label="Inicio">
            <div>
              <img src="/images/logo.png" alt="Kozzy logo" className="logo-img" />
            </div>
          </Link>
        </div>

        <div className="nav-center-wrapper">
          <div className="nav-center">
            <div className="buscador" role="search" aria-label="Buscar productos">
              <input
                aria-label="Buscar"
                value={q}
                onChange={(e) => {
                  const val = e.target.value;
                  setQ(val);
                  setMostrarResultados(!!val.trim());
                }}
                onFocus={() => q && setMostrarResultados(true)}
                onBlur={() => setTimeout(() => setMostrarResultados(false), 200)}
                placeholder="Buscar..."
              />
              {mostrarResultados && (
                <div className="dropdown-search">
                  {resultados.length > 0 ? (
                    <ul className="search-results">
                      {resultados.slice(0, 6).map((p) => (
                        <li
                          key={p.id}
                          className="search-item"
                          onMouseDown={() => handleProductoClick(p.id)}
                        >
                          <img
                            src={p.imagenUrl || "/images/no-image.png"}
                            alt={p.nombre}
                          />
                          <div>
                            <strong>{p.nombre}</strong>
                            <p>S/ {p.precioDescuento ?? p.precio}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="search-empty">No se encontraron resultados</div>
                  )}
                </div>
              )}
            </div>

            <nav className="nav-links" aria-label="Navegación principal">
              <div className="menu-item has-dropdown products-dropdown">
                <button className="menu-btn">
                  Productos <span className="caret">▾</span>
                </button>
                <div className="dropdown dropdown-products">
                  <div className="dropdown-grid">
                    <div className="col">
                      <h4>Novedades</h4>
                      <ul>
                        <li>
                          <button
                            className="link-like"
                            onClick={() => handleSpecialView("ofertas")}
                          >
                            Ofertas Semanales
                          </button>
                        </li>
                        <li>
                          <button
                            className="link-like"
                            onClick={() => handleSpecialView("ventas")}
                          >
                            Los más vendidos
                          </button>
                        </li>
                        <li>
                          <button
                            className="link-like"
                            onClick={() => handleSpecialView("lujo")}
                          >
                            Los más lujosos
                          </button>
                        </li>
                      </ul>
                    </div>

                    <div className="col">
                      <h4>Categorías</h4>
                      <ul>
                        {["Brainy", "Techy", "Cuddly", "Todas"].map((c) => (
                          <li key={c}>
                            <button
                              className="link-like"
                              onClick={() => handleCategoriaClick(c)}
                            >
                              {c}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="col">
                      <h4>Accesorios</h4>
                      <ul>
                        {["Sombreros", "Ropa", "Juguetes", "Comida"].map((a) => (
                          <li key={a}>
                            <button
                              className="link-like"
                              onClick={() => navigate("/still-working")}
                            >
                              {a}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="menu-item has-dropdown cart-dropdown">
                <button className="menu-btn">
                  Carrito ({totalItems}) <span className="caret">▾</span>
                </button>
                <div className="dropdown dropdown-cart">
                  <div className="cart-list">
                    {carrito.length === 0 ? (
                      <div className="cart-empty">Tu carrito está vacío</div>
                    ) : (
                      <>
                        <ul>
                          {carrito.map((item) => (
                            <li key={item.id} className="cart-item">
                              <img
                                src={item.imagenUrl || "/images/no-image.png"}
                                alt={item.nombre}
                              />
                              <div className="cart-info">
                                <strong>{item.nombre}</strong>
                                <div className="cart-controls">
                                  <label>
                                    Cant:
                                    <input
                                      type="number"
                                      min="1"
                                      value={item.cantidad || 1}
                                      onChange={(e) =>
                                        cambiarCantidad(
                                          item.id,
                                          Number(e.target.value || 1)
                                        )
                                      }
                                    />
                                  </label>
                                  <button
                                    className="link-remove"
                                    onClick={() => quitarDelCarrito(item.id)}
                                  >
                                    Quitar
                                  </button>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                        <div className="cart-actions">
                          <Link to="/carrito" className="btn">
                            Ver carrito
                          </Link>
                          <Link to="/checkout" className="btn alt">
                            Pagar
                          </Link>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="menu-item has-dropdown fun-dropdown">
                <button className="menu-btn">
                  Diversión <span className="caret">▾</span>
                </button>
                <div className="dropdown dropdown-fun">
                  <div className="fun-grid">
                    <Link to="/pomodoro" className="fun-card">
                      <div
                        className="fun-img"
                        style={{ backgroundImage: "url('/images/Pomodoro.png')" }}
                      >
                        <div className="fun-caption">Pomodoro</div>
                      </div>
                    </Link>

                    <Link to="/shimejis" className="fun-card">
                      <div
                        className="fun-img"
                        style={{ backgroundImage: "url('/images/no-image.png')" }}
                      >
                        <div className="fun-caption">Shimejis</div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </div>

        <div className="nav-right">
          {usuario ? (
            <>
              <button
                onClick={() => navigate("/mi-cuenta")}
                className="btn alt"
              >
                Mi cuenta
              </button>
            </>
          ) : (
            <button onClick={() => navigate("/login")} className="btn">
              Mi cuenta
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
