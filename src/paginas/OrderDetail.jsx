import React from 'react'
import { useParams } from 'react-router-dom'
import { useUsuarios } from '../context/UsuariosContext'

export default function OrderDetail(){
  const { id } = useParams()
  const { ordenes, cancelOrder } = useUsuarios()
  const orden = ordenes.find(o=> String(o.id) === String(id))
  if (!orden) return <div>Orden no encontrada</div>
  return (
    <section className="card">
      <h1>Detalle orden #{orden.id}</h1>
      <p>Estado: {orden.estado}</p>
      <p>Fecha: {orden.fecha}</p>
      <h3>Items</h3>
      <ul>{orden.items.map(it=>(<li key={it.id}>{it.nombre} x{it.cantidad}</li>))}</ul>
      <div style={{marginTop:12}}><button onClick={()=> { cancelOrder(orden.id); alert('Orden cancelada (simulado)') }}>Cancelar orden</button></div>
    </section>
  )
}
