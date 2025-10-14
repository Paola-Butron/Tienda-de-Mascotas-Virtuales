import React, { useState } from "react";
import { useUsuarios } from "../context/UsuariosContext";
import { useNavigate } from "react-router-dom";
import "./ForgotPassword.css";

export default function ForgotPassword() {
  const { usuarios, forgotPassword, updatePassword } = useUsuarios();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [codigo, setCodigo] = useState("");
  const [inputCodigo, setInputCodigo] = useState("");
  const [newPass, setNewPass] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Paso 1: Buscar correo
  const handleEmailSubmit = (e) => {
    e.preventDefault();

    if (!email) return setMessage("Por favor, ingresa tu correo electrónico");

    const existe = forgotPassword(email);
    if (!existe) return setMessage("No existe una cuenta con ese correo");

    // Generar código de 6 dígitos
    const codigoGenerado = Math.floor(100000 + Math.random() * 900000);
    setCodigo(codigoGenerado.toString());
    console.log("Código enviado", codigoGenerado);
    setMessage("Se ha enviado un código a tu correo");
    setStep(2);
  };

  // Paso 2: Validar código y cambiar contraseña
  const handleResetSubmit = (e) => {
    e.preventDefault();

    if (inputCodigo !== codigo) return setMessage("El código es incorrecto");
    if (newPass.length < 8)
      return setMessage("La nueva contraseña debe tener al menos 8 caracteres");

    updatePassword(email, newPass);
    setMessage("Contraseña actualizada correctamente");
    setTimeout(() => navigate("/login"), 2500);
  };

  return (
    <section className="forgot-container">
      <div className="forgot-card">
        <h1 className="forgot-title">Recuperar Contraseña</h1>

        {step === 1 && (
          <>
            <p className="forgot-subtitle">
              Ingresa tu correo para recibir un código de recuperación
            </p>
            <form onSubmit={handleEmailSubmit}>
              <input
                type="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit">Enviar código</button>
            </form>
          </>
        )}

        {step === 2 && (
          <>
            <p className="forgot-subtitle">
              Ingresa el código y tu nueva contraseña
            </p>
            <form onSubmit={handleResetSubmit}>
              <input
                type="text"
                placeholder="Código recibido"
                value={inputCodigo}
                onChange={(e) => setInputCodigo(e.target.value)}
              />
              <input
                type="password"
                placeholder="Nueva contraseña"
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
              />
              <button type="submit">Cambiar contraseña</button>
            </form>
          </>
        )}

        {message && <p className="forgot-message">{message}</p>}

        <div className="forgot-links">
          <a href="/login">Volver al inicio de sesión</a>
        </div>
      </div>
    </section>
  );
}
