import { useNavigate } from "react-router-dom"

export default function ProductoItem({ producto }) {
  const navigate = useNavigate()

  return (
    <li className="producto-item">
      <h3 className="nombre">{producto.nombre}</h3>

      <div className="producto-info">
        <div className="imagen-contenedor">
          <img src={producto.imagenUrl} alt={producto.nombre} />
        </div>

        {producto.tieneDescuento ? (
          <div className="precio">
            <p className="precio-original">S/ {producto.precio.toFixed(2)}</p>
            <p className="precio-descuento">S/ {producto.precioDescuento.toFixed(2)}</p>
          </div>
        ) : (
          <p className="precio">S/ {producto.precio.toFixed(2)}</p>
        )}
      </div>

      <button className="comprar" onClick={() => navigate(`/productos/${producto.id}`)}>
        Comprar
      </button>
    </li>
  )
}
