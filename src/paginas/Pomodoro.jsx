import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useProductos } from '../context/ProductosContext';
import './Pomodoro.css';
import sonidoFinal from "/sound/alarm.mp3";

export default function Pomodoro() {
  const [mode, setMode] = useState('focus');
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [cycleCount, setCycleCount] = useState(0);
  const timerRef = useRef(null);

  const [menuAbierto, setMenuAbierto] = useState(false);
  const [mascotaSeleccionada, setMascotaSeleccionada] = useState(null);

  const { productos } = useProductos();
  const mascotasActivas = productos.filter(p => p.activo);

  const FOCUS_TIME = 25 * 60;
  const SHORT_BREAK = 5 * 60;
  const LONG_BREAK = 15 * 60;
  const audio = new Audio(sonidoFinal);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            audio.play();
            handleSessionEnd();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isRunning, mode, cycleCount]);

  const handleSessionEnd = () => {
    if (mode === 'focus') {
      const nextCycle = cycleCount + 1;
      setCycleCount(nextCycle);
      if (nextCycle % 4 === 0) {
        setMode('long');
        setTimeLeft(LONG_BREAK);
      } else {
        setMode('short');
        setTimeLeft(SHORT_BREAK);
      }
    } else {
      setMode('focus');
      setTimeLeft(FOCUS_TIME);
      if (mode === 'long') setCycleCount(0);
    }
  };

  const startTimer = () => setIsRunning(true);
  const pauseTimer = () => setIsRunning(false);
  const resetTimer = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
    setCycleCount(0);
    setMode('focus');
    setTimeLeft(FOCUS_TIME);
  };

  const switchMode = (newMode) => {
    clearInterval(timerRef.current);
    setIsRunning(false);
    setMode(newMode);
    setCycleCount(newMode === 'focus' ? cycleCount : 0);
    if (newMode === 'focus') setTimeLeft(FOCUS_TIME);
    if (newMode === 'short') setTimeLeft(SHORT_BREAK);
    if (newMode === 'long') setTimeLeft(LONG_BREAK);
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };


  const mosaico = useMemo(() => {
    if (!mascotaSeleccionada) return null;

    const tiles = [];
    const columnas = 10;
    const filas = 6;
    const espaciadoX = 8; 
    const espaciadoY = 10; 

    for (let y = 0; y < filas; y++) {
      for (let x = 0; x < columnas; x++) {
        const rotacion = Math.floor(Math.random() * 360);
        const imagen =
          mascotaSeleccionada.imagenUrlCartoon ||
          mascotaSeleccionada.imagenUrl;

        tiles.push(
          <img
            key={`${x}-${y}`}
            src={imagen}
            alt={mascotaSeleccionada.nombre}
            className="tile"
            style={{
              top: `${(y * 100) / filas + y * espaciadoY}%`,
              left: `${(x * 100) / columnas + x * espaciadoX}%`,
              transform: `rotate(${rotacion}deg)`,
            }}
          />
        );
      }
    }
    return tiles;
  }, [mascotaSeleccionada]);

  return (
    <div className="pomodoro-root">
      {/* 🧱 Fondo tipo mosaico */}
      {mascotaSeleccionada && (
        <div className="mosaic-bg">
          {mosaico}
        </div>
      )}

      <div className="pomodoro-container">
        <h1 className="pomodoro-title">¿En qué te quieres concentrar?</h1>

        <div className="mode-buttons">
          <div className="focus-section">
            <button
              className={`mode-btn ${mode === 'focus' ? 'active' : ''}`}
              onClick={() => switchMode('focus')}
            >
              Focus
            </button>
            <div className="cycle-indicator">
              {[1, 2, 3, 4].map((i) => (
                <span
                  key={i}
                  className={`cycle-dot ${cycleCount >= i ? 'filled' : ''}`}
                ></span>
              ))}
            </div>
          </div>

          <button
            className={`mode-btn ${mode === 'short' ? 'active' : ''}`}
            onClick={() => switchMode('short')}
          >
            Short Break
          </button>
          <button
            className={`mode-btn ${mode === 'long' ? 'active' : ''}`}
            onClick={() => switchMode('long')}
          >
            Long Break
          </button>
        </div>

        <div className="timer-display">{formatTime(timeLeft)}</div>

        <div className="pomodoro-controls">
          {!isRunning ? (
            <button className="btn start-btn" onClick={startTimer}>Start</button>
          ) : (
            <button className="btn start-btn" onClick={pauseTimer}>Pause</button>
          )}
          <button className="btn reset-btn" onClick={resetTimer}>⟳</button>
        </div>
      </div>

      {/* 🐾 Botón flotante */}
      <button
        className="boton-patita"
        onClick={() => setMenuAbierto(!menuAbierto)}
      >
        🐾
      </button>

      {/* 🐕 Menú lateral de mascotas */}
      <div className={`menu-mascotas ${menuAbierto ? 'abierto' : ''}`}>
        <h3>Elige tu mascota</h3>
        <ul>
          {mascotasActivas.map((m) => (
            <li
              key={m.id}
              onClick={() => {
                setMascotaSeleccionada(m);
                setMenuAbierto(false);
              }}
            >
              <img src={m.imagenUrlCartoon || m.imagenUrl} alt={m.nombre} />
              <span>{m.nombre}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
