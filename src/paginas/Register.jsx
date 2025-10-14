import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "./Register.css";

export default function Registro() {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    contraseña: '',
  });

  const [errores, setErrores] = useState({});
  const navigate = useNavigate();

  // Manejar cambios del formulario
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validar formulario antes de enviar
  const validarFormulario = () => {
    let nuevosErrores = {};

    if (!formData.nombre.trim()) {
      nuevosErrores.nombre = 'El nombre es obligatorio';
    }

    if (!formData.apellido.trim()) {
      nuevosErrores.apellido = 'El apellido es obligatorio';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.correo)) {
      nuevosErrores.correo = 'Ingresa un correo válido';
    }

    if (formData.contraseña.length < 8) {
      nuevosErrores.contraseña = 'La contraseña debe tener al menos 8 caracteres';
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  // Enviar formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validarFormulario()) {
      // Obtener usuarios guardados (si existen)
      const usuariosGuardados = JSON.parse(localStorage.getItem("usuarios")) || [];

      // Verificar si el correo ya está registrado
      const existe = usuariosGuardados.some(u => u.correo === formData.correo);
      if (existe) {
        alert("Ese correo ya está registrado 😅");
        return;
      }

      // Agregar el nuevo usuario
      usuariosGuardados.push(formData);
      localStorage.setItem("usuarios", JSON.stringify(usuariosGuardados));

      // Guardar al usuario actual como "logueado"
      localStorage.setItem("usuarioActivo", JSON.stringify(formData));

      alert("Cuenta creada con éxito 🎉 ¡Bienvenido!");
      
      // Limpiar formulario
      setFormData({ nombre: '', apellido: '', correo: '', contraseña: '' });
      setErrores({});

      // Redirigir a la página principal o dashboard
      navigate("/inicio");
    }
  };

  return (
    <div className="registro-container">
      <div className="registro-card">
        <h1 className="registro-titulo">Registro</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={formData.nombre}
            onChange={handleChange}
          />
          {errores.nombre && <p className="error">{errores.nombre}</p>}

          <input
            type="text"
            name="apellido"
            placeholder="Apellido"
            value={formData.apellido}
            onChange={handleChange}
          />
          {errores.apellido && <p className="error">{errores.apellido}</p>}

          <input
            type="email"
            name="correo"
            placeholder="Correo"
            value={formData.correo}
            onChange={handleChange}
          />
          {errores.correo && <p className="error">{errores.correo}</p>}

          <input
            type="password"
            name="contraseña"
            placeholder="Contraseña"
            value={formData.contraseña}
            onChange={handleChange}
          />
          {errores.contraseña && <p className="error">{errores.contraseña}</p>}

          <button type="submit">Crear cuenta</button>
        </form>
      </div>
    </div>
  );
}
