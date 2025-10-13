import React from 'react'
import { useParams } from 'react-router-dom'
import { useProductos } from '../context/ProductosContext'
import './DetalleProducto.css'

export default function DetalleProducto() {
  const { id } = useParams()
  const { productos, agregarAlCarrito } = useProductos()
  const producto = productos.find(p => String(p.id) === String(id))

  if (!producto) return <div>Producto no encontrado</div>
  if (!producto.activo) return <div>Producto no disponible</div>

  const { nombre, imagenUrl, descripcion, precio } = producto

  return (
    <section className="detalle-producto card">
      <img src={imagenUrl} alt={nombre} className="detalle-imagen" />
      <div className="detalle-info">
        <h2>{nombre}</h2>
        <ul className="detalle-lista">
          <li><strong>Personalidad:</strong> {descripcion.personalidad}</li>
          <li><strong>Función:</strong> {descripcion.funcion}</li>
          <li><strong>Poder Especial:</strong> {descripcion.poderEspecial}</li>
          <li><strong>Beneficio:</strong> {descripcion.beneficio}</li>
        </ul>
        {producto.tieneDescuento ? (
          <div>
            <p style={{ textDecoration: 'line-through', color: '#888' }}>
              S/ {producto.precio.toFixed(2)}
            </p>
            <p style={{ fontSize: '1.5em', fontWeight: 'bold', color: '#333' }}>
              S/ {producto.precioDescuento.toFixed(2)}
            </p>
          </div>
        ) : (
          <p style={{ fontSize: '1.5em', fontWeight: 'bold' }}>
            S/ {producto.precio.toFixed(2)}
          </p>
        )}
        <button className="btn-agregar" onClick={() => agregarAlCarrito(producto, 1)}>Agregar al carrito</button>
      </div>
    </section>
  )
}
