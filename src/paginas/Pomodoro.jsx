// src/paginas/Pomodoro.jsx
import React, { useState, useEffect, useRef } from 'react';
import './Pomodoro.css';

export default function Pomodoro() {
  const [mode, setMode] = useState('focus'); // focus, short, long
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [cycleCount, setCycleCount] = useState(0);
  const timerRef = useRef(null);

  const FOCUS_TIME = 25 * 60;
  const SHORT_BREAK = 5 * 60;
  const LONG_BREAK = 15 * 60;

  // Iniciar el timer
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
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
      // Termina Focus, marca la bolita
      const nextCycle = cycleCount + 1;
      setCycleCount(nextCycle);

      // Decide el break siguiente
      if (nextCycle % 4 === 0) {
        setMode('long');
        setTimeLeft(LONG_BREAK);
      } else {
        setMode('short');
        setTimeLeft(SHORT_BREAK);
      }
      // No se detiene, sigue corriendo automáticamente
    } else if (mode === 'short' || mode === 'long') {
      // Termina un break, vuelve a Focus
      setMode('focus');
      setTimeLeft(FOCUS_TIME);
      if (mode === 'long') setCycleCount(0); // resetear ciclos después del long break
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
    setCycleCount(newMode === 'focus' ? cycleCount : 0); // resetear ciclos solo si cambias manualmente
    if (newMode === 'focus') setTimeLeft(FOCUS_TIME);
    if (newMode === 'short') setTimeLeft(SHORT_BREAK);
    if (newMode === 'long') setTimeLeft(LONG_BREAK);
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="pomodoro-root">
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
    </div>
  );
}
