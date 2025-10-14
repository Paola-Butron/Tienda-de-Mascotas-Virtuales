import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useProductos } from '../context/ProductosContext'
import ProductoItem from '../componentes/ProductoItem'
import './Productos.css';

export default function Productos() {
  const { productos } = useProductos()
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todas')
  const [orden, setOrden] = useState('ninguno')

  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)
    const categoriaDesdeURL = queryParams.get('categoria')
    const viewDesdeURL = queryParams.get('view')
    const ofertasDesdeURL = queryParams.get('ofertas')

    if (viewDesdeURL === 'ventas') {
      setCategoriaSeleccionada('Más vendidos')
    } else if (viewDesdeURL === 'lujo') {
      setCategoriaSeleccionada('Más lujosos')
    } else if (categoriaDesdeURL) {
      setCategoriaSeleccionada(categoriaDesdeURL)
    } else if (viewDesdeURL === 'ofertas' || ofertasDesdeURL === 'true') {
      setCategoriaSeleccionada('Ofertas')
    } else {
      setCategoriaSeleccionada('Todas')
    }
  }, [location.search])

  // --- Filtrar productos activos y según categoría / ofertas / ventas / lujo ---
  let productosFiltrados = productos.filter(p => p.activo)

  if (categoriaSeleccionada === 'Ofertas') {
    productosFiltrados = productosFiltrados.filter(p => p.tieneDescuento)
  } else if (categoriaSeleccionada === 'Más vendidos') {
    productosFiltrados = productosFiltrados.filter(p => (p.ventasMes || 0) > 100)
  } else if (categoriaSeleccionada === 'Más lujosos') {
    productosFiltrados = productosFiltrados.filter(p => (p.precio || 0) > 100)
  } else if (categoriaSeleccionada !== 'Todas') {
    productosFiltrados = productosFiltrados.filter(p => p.categoria === categoriaSeleccionada)
  }

  // --- Ordenar productos ---
  if (orden === 'precioAsc') {
    productosFiltrados.sort((a, b) => (a.precioDescuento || a.precio) - (b.precioDescuento || b.precio))
  } else if (orden === 'precioDesc') {
    productosFiltrados.sort((a, b) => (b.precioDescuento || b.precio) - (a.precioDescuento || a.precio))
  } else if (orden === 'alfabetico') {
    productosFiltrados.sort((a, b) => a.nombre.localeCompare(b.nombre))
  }

  // --- Manejo de clicks en categorías ---
  const handleCategoriaClick = (cat) => {
    if (cat === 'Ofertas') {
      navigate('/productos?view=ofertas')
    } else if (cat === 'Todas') {
      navigate('/productos')
    } else if (cat === 'Más vendidos') {
      navigate('/productos?view=ventas')
    } else if (cat === 'Más lujosos') {
      navigate('/productos?view=lujo')
    } else {
      navigate(`/productos?categoria=${cat}`)
    }
  }

  return (
    <div className="productos-container">
      <h2>
        {categoriaSeleccionada === 'Ofertas'
          ? 'Ofertas Semanales'
          : categoriaSeleccionada === 'Todas'
          ? 'Nuestros Productos'
          : categoriaSeleccionada === 'Más vendidos'
          ? 'Los más vendidos'
          : categoriaSeleccionada === 'Más lujosos'
          ? 'Los más lujosos'
          : `Categoría: ${categoriaSeleccionada}`}
      </h2>

      {/* === FILTROS Y ORDEN === */}
      <div className="filtros">
        <div className="categorias">
          {['Todas', 'Brainy', 'Techy', 'Cuddly', 'Questy', 'Arty', 'Herity', 'Más vendidos', 'Más lujosos'].map((cat) => (
            <button
              key={cat}
              className={categoriaSeleccionada === cat ? 'activo' : ''}
              onClick={() => handleCategoriaClick(cat)}
            >
              {cat}
            </button>
          ))}
          <button
            className={categoriaSeleccionada === 'Ofertas' ? 'activo' : ''}
            onClick={() => handleCategoriaClick('Ofertas')}
          >
            Ofertas
          </button>
        </div>

        <div className="orden">
          <label htmlFor="orden">Ordenar por:</label>
          <select id="orden" value={orden} onChange={(e) => setOrden(e.target.value)}>
            <option value="ninguno">Sin ordenar</option>
            <option value="precioAsc">Precio (menor a mayor)</option>
            <option value="precioDesc">Precio (mayor a menor)</option>
            <option value="alfabetico">Alfabéticamente</option>
          </select>
        </div>
      </div>

      {/* === LISTA DE PRODUCTOS === */}
      <div className="lista-productos">
        {productosFiltrados.length > 0 ? (
          productosFiltrados.map((prod) => (
            <ProductoItem key={prod.id} producto={prod} />
          ))
        ) : (
          <p className="mensaje-vacio">No hay productos disponibles en esta categoría.</p>
        )}
      </div>
    </div>
  )
}
