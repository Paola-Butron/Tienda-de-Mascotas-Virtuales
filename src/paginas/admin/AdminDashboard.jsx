import React from 'react'
import { useUsuarios } from '../../context/UsuariosContext'
import { useProductos } from '../../context/ProductosContext'

export default function AdminDashboard(){
  const { usuarios, ordenes } = useUsuarios()
  const { productos } = useProductos()
  const ingresos = (ordenes || []).reduce((s,o)=> s + (parseFloat(o.total)||0), 0).toFixed(2)
  return (
    <section>
      <h1>Panel Administrador</h1>
      <div style={{display:'flex', gap:12}}>
        <div className="card">Usuarios: {usuarios.length}</div>
        <div className="card">Órdenes: {ordenes.length}</div>
        <div className="card">Ingresos totales: S/ {ingresos}</div>
      </div>
    </section>
  )
}
