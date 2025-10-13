import React, { useState } from 'react'
import { useUsuarios } from '../context/UsuariosContext'
import { useNavigate } from 'react-router-dom'

export default function Register(){
  const { register } = useUsuarios()
  const [form, setForm] = useState({ nombre:'', apellido:'', email:'', password:'' })
  const nav = useNavigate()

  const submit = (e)=> {
    e.preventDefault()
    try { register(form); nav('/') } catch(err) { alert(err.message) }
  }

  return (
    <section className="pagina-form">
      <h1>Registro</h1>
      <form onSubmit={submit} className="formulario card">
        <input value={form.nombre} onChange={e=>setForm({...form,nombre:e.target.value})} placeholder="Nombre" required />
        <input value={form.apellido} onChange={e=>setForm({...form,apellido:e.target.value})} placeholder="Apellido" required />
        <input value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="Correo" required />
        <input type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} placeholder="Contraseña" required />
        <div className="acciones"><button type="submit">Crear cuenta</button></div>
      </form>
    </section>
  )
}
