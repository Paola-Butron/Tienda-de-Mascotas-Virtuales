import React, { useState } from 'react'
import { useProductos } from '../../context/ProductosContext'

export default function Categorias(){
  const { categorias, agregarCategoria } = useProductos()
  const [name, setName] = useState('')
  return (
    <section>
      <h1>Categorías</h1>
      <div className="card">
        <h3>Agregar categoría</h3>
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Nombre categoría" />
        <button onClick={()=> { if(name.trim()) { agregarCategoria(name.trim()); setName('') } }}>Agregar</button>
      </div>
      <ul>{categorias.map((c,i)=>(<li key={i}>{c}</li>))}</ul>
    </section>
  )
}
