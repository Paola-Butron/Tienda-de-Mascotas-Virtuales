import React from 'react'
import { useUsuarios } from '../context/UsuariosContext'
import { Link } from 'react-router-dom'

export default function Account(){
  const { usuarioLogueado, ordenes } = useUsuarios()
  if (!usuarioLogueado) return <div>Debes iniciar sesión. <Link to="/login">Entrar</Link></div>
  const userOrders = ordenes.slice(0,20)
  return (
    <section>
      <h1>Mi cuenta</h1>
      <div className="card">
        <h3>Bienvenido, {usuarioLogueado.nombre}</h3>
        <p>Email: {usuarioLogueado.email}</p>
      </div>
      <div className="card">
        <h3>Órdenes recientes</h3>
        <ul>{userOrders.map(o=> (<li key={o.id}><Link to={'/orden/'+o.id}>Orden #{o.id} - {o.estado}</Link></li>))}</ul>
      </div>
    </section>
  )
}
