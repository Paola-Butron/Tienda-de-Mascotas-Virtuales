import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function ProductoForm({ onSubmit, productoInicial = { nombre: '', descripcion: '', imagenUrl: '', precio: '', categoria: '' } }) {
  const [producto, setProducto] = useState(productoInicial)
  const navigate = useNavigate()

  useEffect(() => { setProducto(productoInicial) }, [productoInicial])

  const handleChange = (e) => {
    const { name, value } = e.target
    setProducto(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (producto.nombre.trim() === '' || producto.descripcion.trim() === '') {
      alert('El nombre y la descripción no pueden estar vacíos.')
      return
    }
    if (producto.precio) producto.precio = parseFloat(producto.precio)
    onSubmit(producto)
    navigate('/productos')
  }

  return (
    <form onSubmit={handleSubmit} className="formulario">
      <input type="text" name="nombre" value={producto.nombre} onChange={handleChange} placeholder="Nombre del producto" required />
      <textarea name="descripcion" value={producto.descripcion} onChange={handleChange} placeholder="Descripción" required />
      <input type="number" name="precio" value={producto.precio} onChange={handleChange} placeholder="Precio (S/.)" step="0.01" />
      <input type="text" name="imagenUrl" value={producto.imagenUrl} onChange={handleChange} placeholder="URL de la imagen (p.ej. /images/perro.svg)" />
      <input type="text" name="categoria" value={producto.categoria} onChange={handleChange} placeholder="Categoría" />
      <div className="acciones">
        <button type="submit">Guardar</button>
        <button type="button" onClick={() => navigate(-1)}>Cancelar</button>
      </div>
    </form>
  )
}
