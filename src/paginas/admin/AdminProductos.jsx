import React, { useState } from 'react'
import { useProductos } from '../../context/ProductosContext'
import { Link } from 'react-router-dom'

export default function AdminProductos(){
  const { productos, toggleActivo } = useProductos()
  const [q, setQ] = useState('')
  const filtered = productos.filter(p=> String(p.id).includes(q) || p.nombre.toLowerCase().includes(q.toLowerCase()))
  return (
    <section>
      <h1>Gestión de Productos</h1>
      <input placeholder="Buscar por id o nombre" value={q} onChange={e=>setQ(e.target.value)} />
      <Link to="/productos/nuevo"><button>Agregar</button></Link>
      <ul className="lista-productos">{filtered.map(p => (
        <li key={p.id} className="producto-item"><img src={p.imagenUrl} alt={p.nombre} /><div><h4>{p.nombre}</h4><div className="small">{p.categoria}</div></div>
        <div className="acciones"><button onClick={()=> toggleActivo(p.id)}>{p.activo ? 'Desactivar' : 'Activar'}</button><Link to={'/productos/'+p.id}><button>Detalle</button></Link></div></li>
      ))}</ul>
    </section>
  )
}
