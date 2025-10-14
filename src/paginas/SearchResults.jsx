import React, { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { useProductos } from '../context/ProductosContext'
import ProductoItem from '../componentes/ProductoItem'

function useQuery(){ return new URLSearchParams(useLocation().search) }

export default function SearchResults(){
  const q = useQuery()
  const term = q.get('q') || ''
  const sort = q.get('sort') || 'nombre'
  const category = q.get('cat') || ''
  const { productos, categorias } = useProductos()
  const [results, setResults] = useState([])

  useEffect(()=>{
    const t = term.toLowerCase().trim()
    let res = productos.filter(p => p.activo && (p.nombre.toLowerCase().includes(t) || p.categoria.toLowerCase().includes(t)))
    if (category) res = res.filter(r=> r.categoria === category)
    if (sort === 'precio') res.sort((a,b)=> a.precio - b.precio); else res.sort((a,b)=> a.nombre.localeCompare(b.nombre))
    setResults(res)
  }, [term, sort, category, productos])

  return (
    <section>
      <h1>Resultados de búsqueda</h1>
      <div style={{display:'flex', gap:12}}>
        <aside style={{width:220}} className="card">
          <h4>Filtrar por categoría</h4>
          <ul>{categorias.map((c,i)=> (<li key={i}><Link to={`/buscar?q=${term}&cat=${encodeURIComponent(c)}&sort=${sort}`}>{c}</Link></li>))}</ul>
        </aside>
        <div style={{flex:1}}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <div>{results.length} resultados</div>
            <div>
              <Link to={`/buscar?q=${term}&sort=nombre`}>Ordenar por nombre</Link> | <Link to={`/buscar?q=${term}&sort=precio`}>Ordenar por precio</Link>
            </div>
          </div>
          <ul className="lista-productos">{results.map(r=> <ProductoItem key={r.id} producto={r} />)}</ul>
        </div>
      </div>
    </section>
  )
}
