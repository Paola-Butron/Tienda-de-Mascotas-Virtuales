import { Link } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import { useProductos } from '../context/ProductosContext'
import './Inicio.css'

export default function Inicio() {
  const [slide, setSlide] = useState(0)
  const { productos, categorias } = useProductos()
  const top12 = [...productos].sort((a,b)=> (b.ventasMes||0)-(a.ventasMes||0)).filter(p=>p.activo).slice(0,12)
  const nuevos6 = [...productos].slice(0,6).filter(p=>p.activo)


  const imagenesCategorias = [
    '/images/9.png',   
    '/images/11.png',  
    '/images/12.png', 
    '/images/2.png',   
    '/images/7.png',
    '/images/5.png'

  ]

  const ofertas = [
    {
      titulo: "Desde 30% de descuento en la categoría Brainy",
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

  return (
    <section className="inicio">
      <div className="inicio-principal card">
        <div className="inicio-texto">
          <h1>Adopta a una mascota virtual 🐶</h1>
          <p>Productos, accesorios y juegos para tus mascotas virtuales</p>
          <Link to="/productos"><button>Ver catálogo</button></Link>
        </div>
        <img 
          src="https://androidguias.com/wp-content/uploads/2025/08/My-Tamagotchi-Forever.png"  
          alt="mascotas" 
          className="inicio-imagen" 
        />
      </div>

       {/* Carrusel de ofertas */}
      <div className="oferta-carrusel">
        <div className="oferta-texto">
          <h3>{ofertas[slide].titulo}</h3>
          <p>{ofertas[slide].descripcion}</p>
        </div>

        <div className="oferta-separador"></div> {/* separador fijo */}

        <img src={ofertas[slide].imagen} alt="Oferta" className="oferta-imagen" />

        <div className="carrusel-bolitas">
          {ofertas.map((_, i) => (
            <span 
              key={i} 
              className={i === slide ? 'active' : ''} 
              onClick={() => setSlide(i)}
            ></span>
          ))}
        </div>
      </div>

      <h2>Categorías destacadas</h2>
      <div className="categorias-destacadas">
        {categorias.slice(0,3).map((c,i)=>(
          <Link key={i} to={`/buscar?categoria=${encodeURIComponent(c)}`} className="categoria-card">
            <img src={imagenesCategorias[i]} className="categoria-imagen" alt={c} />
            <span>{c}</span>
          </Link>
        ))}
      </div>

      <h2>Más vendidos del mes</h2>
          <ul className="lista-productos">
            {top12.slice(0,6).map(p => (
              <li key={p.id} className="mini-card">
                <Link to={`/productos/${p.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <img src={p.imagenUrl} alt={p.nombre} />
                  <div className="producto-info">
                    <strong>{p.nombre}</strong>
                    <div className="small">{p.categoria}</div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>

      <h2>Categorías nuevas</h2>
        <div className="categorias-destacadas">
          {categorias.slice(3,6).map((c, i) => (
            <Link 
              key={i} 
              to={`/buscar?categoria=${encodeURIComponent(c)}`} 
              className="categoria-card"
            >
              <img src={imagenesCategorias[i+3]} className="categoria-imagen" alt={c} />
              <span>{c}</span>
            </Link>
          ))}
        </div>

      <h2>Productos nuevos</h2>
          <ul className="lista-productos">
            {nuevos6.map(p => (
              <li key={p.id} className="mini-card">
                <Link to={`/productos/${p.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <img src={p.imagenUrl} alt={p.nombre} />
                  <div className="producto-info">
                    <strong>{p.nombre}</strong>
                    <div className='small'>{p.categoria}</div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
    </section>
  )
}
