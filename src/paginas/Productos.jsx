import { useState } from 'react'
import { useProductos } from '../context/ProductosContext'
import ProductoItem from '../componentes/ProductoItem'
import './Productos.css';

export default function Productos() {
  const { productos } = useProductos()
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todas')
  const [orden, setOrden] = useState('ninguno')

  // --- Filtrar productos activos y por categoría ---
  let productosFiltrados = productos.filter(
    (p) => p.activo && (categoriaSeleccionada === 'Todas' || p.categoria === categoriaSeleccionada)
  )

  // --- Ordenar productos ---
  if (orden === 'precioAsc') {
    productosFiltrados.sort((a, b) => a.precio - b.precio)
  } else if (orden === 'precioDesc') {
    productosFiltrados.sort((a, b) => b.precio - a.precio)
  } else if (orden === 'alfabetico') {
    productosFiltrados.sort((a, b) => a.nombre.localeCompare(b.nombre))
  }

  return (
    <div className="productos-container">
      <h2>Nuestros Productos</h2>

      {/* === FILTROS Y ORDEN === */}
      <div className="filtros">
        <div className="categorias">
          {['Todas', 'Brainy', 'Techy', 'Cuddly', 'Questy', 'Arty', 'Herity'].map((cat) => (
            <button
              key={cat}
              className={categoriaSeleccionada === cat ? 'activo' : ''}
              onClick={() => setCategoriaSeleccionada(cat)}
            >
              {cat}
            </button>
          ))}
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
