import { Link } from 'react-router-dom'
import { useProductos } from '../context/ProductosContext'
import { motion } from 'framer-motion'

export default function ProductoItem({ producto }) {
  const { eliminarProducto } = useProductos()

  if (!producto.activo) return null

  return (
    <motion.li className="producto-item" initial={{opacity:0, y:8}} animate={{opacity:1,y:0}} transition={{duration:0.18}}>
      <img src={producto.imagenUrl || '/images/perro.svg'} alt={producto.nombre} />
      <div className="contenido">
        <h4>{producto.nombre}</h4>
        <p className="small">{producto.descripcion}</p>
        <p className="precio">S/ {producto.precio}</p>
      </div>
      <div className="acciones">
        <Link to={`/productos/${producto.id}`}><button>Ver</button></Link>
        <Link to={`/productos/${producto.id}/editar`}><button>Editar</button></Link>
        <button onClick={() => eliminarProducto(producto.id)}>Eliminar</button>
      </div>
    </motion.li>
  )
}
