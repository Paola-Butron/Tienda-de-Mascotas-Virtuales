import { createContext, useContext, useEffect, useState } from 'react';

const UsuariosContext = createContext();
export const useUsuarios = () => {
  const ctx = useContext(UsuariosContext);
  if (!ctx) throw new Error('useUsuarios debe usarse dentro de UsuariosProvider');
  return ctx;
};

const STORAGE = 'tienda_mascotas_full_users_v1';

export function UsuariosProvider({ children }) {
  const [usuarios, setUsuarios] = useState(() => {
    try { const raw = localStorage.getItem(STORAGE); if (!raw) return []; return JSON.parse(raw).usuarios || []; } catch { return []; }
  });
  const [usuarioLogueado, setUsuarioLogueado] = useState(() => {
    try { const raw = localStorage.getItem(STORAGE); if (!raw) return null; return JSON.parse(raw).usuarioLogueado || null; } catch { return null; }
  });
  const [ordenes, setOrdenes] = useState(() => {
    try { const raw = localStorage.getItem(STORAGE); if (!raw) return []; return JSON.parse(raw).ordenes || []; } catch { return []; }
  });

  useEffect(() => {
    if (usuarios.length === 0) {
      setUsuarios([
        { id: 1, nombre: 'Admin', apellido: '', email: 'admin@local', password: 'admin', role: 'admin', activo: true },
        { id: 2, nombre: 'Cliente', apellido: '', email: 'cliente@local', password: 'cliente', role: 'user', activo: true }
      ]);
    }
  }, []);

  useEffect(() => {
    const payload = { usuarios, usuarioLogueado, ordenes };
    localStorage.setItem(STORAGE, JSON.stringify(payload));
  }, [usuarios, usuarioLogueado, ordenes]);

  const register = (data) => {
    const exists = usuarios.find(u => u.email === data.email);
    if (exists) throw new Error('Ya existe un usuario con ese correo');
    const nuevo = { ...data, id: Date.now(), role: 'user', activo: true };
    setUsuarios(prev => [...prev, nuevo]);
    setUsuarioLogueado({ id: nuevo.id, nombre: nuevo.nombre, email: nuevo.email });
  };

  const login = ({ email, password }) => {
    const u = usuarios.find(x => x.email === email && x.password === password && x.activo);
    if (!u) throw new Error('Credenciales inválidas');
    setUsuarioLogueado({ id: u.id, nombre: u.nombre, email: u.email, role: u.role });
  };

  const logout = () => setUsuarioLogueado(null);

  const forgotPassword = (email) => {
    return usuarios.some(u => u.email === email);
  };

  const addOrder = (order) => {
    const newOrder = { ...order, id: Date.now(), fecha: new Date().toISOString(), estado: 'Pendiente' };
    setOrdenes(prev => [newOrder, ...prev]);
    return newOrder;
  };

  const cancelOrder = (id) => {
    setOrdenes(prev => prev.map(o => o.id === id ? { ...o, estado: 'Cancelado' } : o));
  };

  const adminToggleUser = (id) => {
    setUsuarios(prev => prev.map(u => u.id === id ? { ...u, activo: !u.activo } : u));
  };

  return (
    <UsuariosContext.Provider value={{ usuarios, usuarioLogueado, register, login, logout, forgotPassword, ordenes, addOrder, cancelOrder, adminToggleUser }}>
      {children}
    </UsuariosContext.Provider>
  );
}
