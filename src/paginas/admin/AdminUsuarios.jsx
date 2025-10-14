import React, { useState } from 'react'
import { useUsuarios } from '../../context/UsuariosContext'

export default function AdminUsuarios(){
  const { usuarios, adminToggleUser } = useUsuarios()
  const [q, setQ] = useState('')
  const filtered = usuarios.filter(u=> u.nombre.toLowerCase().includes(q.toLowerCase()) || String(u.id).includes(q))
  return (
    <section>
      <h1>Gestión de Usuarios</h1>
      <input placeholder="Filtrar por id o nombre" value={q} onChange={e=>setQ(e.target.value)} />
      <ul>
        {filtered.map(u=> (<li key={u.id}>{u.id} - {u.nombre} ({u.email}) - {u.activo ? 'Activo' : 'Inactivo'} <button onClick={()=> adminToggleUser(u.id)}>{u.activo ? 'Desactivar' : 'Activar'}</button></li>))}
      </ul>
    </section>
  )
}
