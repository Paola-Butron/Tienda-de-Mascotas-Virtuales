import React from 'react'
import ProductoForm from '../componentes/ProductoForm'
import { useProductos } from '../context/ProductosContext'

export default function NuevoProducto(){
  const { agregarProducto } = useProductos()
  return (
    <section className="pagina-form">
      <h1>Agregar producto</h1>
      <ProductoForm onSubmit={agregarProducto} />
    </section>
  )
}
