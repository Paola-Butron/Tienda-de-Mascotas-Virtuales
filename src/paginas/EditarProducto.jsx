import React from 'react'
import { useParams } from 'react-router-dom'
import ProductoForm from '../componentes/ProductoForm'
import { useProductos } from '../context/ProductosContext'

export default function EditarProducto(){
  const { id } = useParams()
  const { productos, actualizarProducto } = useProductos()
  const producto = productos.find(p => String(p.id) === String(id)) || null
  if (!producto) return <div>Producto no encontrado</div>
  return (
    <section className="pagina-form">
      <h1>Editar producto</h1>
      <ProductoForm onSubmit={actualizarProducto} productoInicial={producto} />
    </section>
  )
}
