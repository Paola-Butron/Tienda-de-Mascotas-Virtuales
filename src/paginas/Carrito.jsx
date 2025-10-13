import React from 'react'
import { useProductos } from '../context/ProductosContext'
import { Link } from 'react-router-dom'

export default function Carrito(){
  const { carrito, quitarDelCarrito, cambiarCantidad, guardarParaDespues, guardados, regresarAlCarrito, eliminarGuardado } = useProductos()
  const total = carrito.reduce((s,i)=> s + (i.precio * (i.cantidad||1)), 0).toFixed(2)

  return (
    <section className="carrito">
      <h1>Carrito de compras</h1>
      {carrito.length===0 ? <p>Tu carrito está vacío. <Link to="/productos">Ver productos</Link></p> : (
        <>
          <ul className="lista-productos">
            {carrito.map(item=> (
              <li key={item.id} className="producto-item">
                <img src={item.imagenUrl} alt={item.nombre} />
                <div className="contenido">
                  <h4>{item.nombre}</h4>
                  <p className="small">S/ {item.precio}</p>
                  <div> <label>Cantidad:</label> <input type="number" min="1" value={item.cantidad} onChange={(e)=> cambiarCantidad(item.id, Number(e.target.value))} /></div>
                </div>
                <div className="acciones">
                  <button onClick={()=> guardarParaDespues(item.id)}>Guardar para después</button>
                  <button onClick={()=> quitarDelCarrito(item.id)}>Eliminar</button>
                </div>
              </li>
            ))}
          </ul>
          <div style={{marginTop:12}}><h3>Total: S/ {total}</h3><Link to="/checkout"><button>Ir a pagar</button></Link></div>
        </>
      )}

      <h2 style={{marginTop:24}}>Guardados para después</h2>
      {guardados.length===0 ? <p>No hay ítems guardados.</p> : (
        <ul className="lista-productos">
          {guardados.map(g=> (
            <li key={g.id} className="producto-item">
              <img src={g.imagenUrl} alt={g.nombre} />
              <div className="contenido"><h4>{g.nombre}</h4><p className='small'>S/ {g.precio}</p></div>
              <div className="acciones">
                <button onClick={()=> regresarAlCarrito(g.id)}>Regresar al carrito</button>
                <button onClick={()=> eliminarGuardado(g.id)}>Eliminar</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
