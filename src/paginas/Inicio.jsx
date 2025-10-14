import { Link, useNavigate } from 'react-router-dom'
import React, { useState, useEffect, useRef } from 'react'
import { useProductos } from '../context/ProductosContext'
import './Inicio.css'

export default function Inicio() {
  const [slide, setSlide] = useState(0)
  const { productos, categorias } = useProductos()
  const navigate = useNavigate()

  const top12 = [...productos]
    .sort((a, b) => (b.ventasMes || 0) - (a.ventasMes || 0))
    .filter(p => p.activo)
    .slice(0, 12)

  const nuevos6 = [...productos]
    .slice(0, 6)
    .filter(p => p.activo)

  const imagenesCategorias = [
    '/images/9C.png',
    '/images/11C.png',
    '/images/12C.png',
    '/images/2C.png',
    '/images/7C.png',
    '/images/5C.png'
  ]

  const ofertas = [
    {
      titulo: "Hasta 30% de descuento en la categoría Brainy",
      descripcion: "Celebra el día de la salud mental junto a las más inteligentes de nuestras mascotas!",
      imagen: "/images/oferta1.png"
    },
    {
      titulo: "Nuevos accesorios para tus mascotas",
      descripcion: "Haz que tu amigo virtual luzca único con estos increíbles complementos.",
      imagen: "/images/oferta2.png"
    },
    {
      titulo: "Juegos educativos disponibles",
      descripcion: "Diviértete y aprende junto a tus mascotas favoritas.",
      imagen: "/images/oferta3.png"
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setSlide(prev => (prev + 1) % ofertas.length)
    }, 8000)
    return () => clearInterval(timer)
  }, [])

  const irACategoria = (categoria) => {
    navigate(`/productos?categoria=${encodeURIComponent(categoria)}`)
  }

  const manejarClickOferta = (index) => {
    if (index === 0) {
      irACategoria("Brainy")
    } else {
      navigate("/still-working")
    }
  }

  const vendidosRef = useRef(null)
  const nuevosRef = useRef(null)

  useEffect(() => {
    const carruseles = [vendidosRef.current, nuevosRef.current]
    carruseles.forEach(carrusel => {
      if (!carrusel) return
      let scrollAmount = 0
      const velocidad = 1
      const intervalo = setInterval(() => {
        scrollAmount += velocidad
        if (scrollAmount >= carrusel.scrollWidth / 2) scrollAmount = 0
        carrusel.scrollLeft = scrollAmount
      }, 20)
      return () => clearInterval(intervalo)
    })
  }, [])

  return (
    <section className="inicio">
      <div className="inicio-principal card">
        <div className="inicio-texto">
          <h1>Encuentra a tu nuevo compañero 🐶</h1>
          <p>Adopta y diviértete con tu nuevo amigo</p>
          <Link to="/productos"><button>Empieza ahora ⭢</button></Link>
        </div>
        <img
          src="/images/main.png"
          alt="mascotas"
          className="inicio-imagen"
        />
      </div>

      {/* Carrusel de ofertas */}
      <div
        className="oferta-carrusel"
        onClick={() => manejarClickOferta(slide)}
        style={{ cursor: 'pointer' }}
      >
        <div className="oferta-texto">
          <h3>{ofertas[slide].titulo}</h3>
          <p>{ofertas[slide].descripcion}</p>
        </div>

        <div className="oferta-separador"></div>

        <img src={ofertas[slide].imagen} alt="Oferta" className="oferta-imagen" />

        <div className="carrusel-bolitas">
          {ofertas.map((_, i) => (
            <span
              key={i}
              className={i === slide ? 'active' : ''}
              onClick={(e) => {
                e.stopPropagation()
                setSlide(i)
              }}
            ></span>
          ))}
        </div>
      </div>

      {/* Categorías destacadas */}
      <h2>Categorías destacadas</h2>
      <div className="categorias-grid">
        {categorias.slice(0, 3).map((c, i) => (
          <div key={i} className="categoria-card" onClick={() => irACategoria(c)}>
            <div className="categoria-circle">
              <img src={imagenesCategorias[i]} alt={c} />
            </div>
            <p>{c}</p>
          </div>
        ))}
      </div>

      {/* Más vendidos */}
      <h2>Más vendidos del mes</h2>
      <div className="carrusel-contenedor" ref={vendidosRef}>
        <div className="carrusel-interno">
          {[...top12, ...top12].map((p, idx) => (
            <div key={idx} className="mini-card">
              <Link to={`/productos/${p.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <img src={p.imagenUrl} alt={p.nombre} />
                <div className="producto-info">
                  <strong>{p.nombre}</strong>
                  <div className="small">{p.categoria}</div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Categorías nuevas */}
      <h2>Categorías nuevas</h2>
      <div className="categorias-grid">
        {categorias.slice(3, 6).map((c, i) => (
          <div key={i} className="categoria-card" onClick={() => irACategoria(c)}>
            <div className="categoria-circle">
              <img src={imagenesCategorias[i + 3]} alt={c} />
            </div>
            <p>{c}</p>
          </div>
        ))}
      </div>

      {/* Productos nuevos */}
      <h2>Productos nuevos</h2>
      <div className="carrusel-contenedor" ref={nuevosRef}>
        <div className="carrusel-interno">
          {[...nuevos6, ...nuevos6].map((p, idx) => (
            <div key={idx} className="mini-card">
              <Link to={`/productos/${p.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <img src={p.imagenUrl} alt={p.nombre} />
                <div className="producto-info">
                  <strong>{p.nombre}</strong>
                  <div className='small'>{p.categoria}</div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
