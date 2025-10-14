import { createContext, useContext, useEffect, useState } from 'react';

const UsuariosContext = createContext();
export const useUsuarios = () => {
  const ctx = useContext(UsuariosContext);
  if (!ctx) throw new Error('useUsuarios debe usarse dentro de UsuariosProvider');
  return ctx;
};

const STORAGE = 'tienda_mascotas_full_users_v1';

export function UsuariosProvider({ children }) {
  // Inicializar usuarios y usuario logueado
  const [usuarios, setUsuarios] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE);
      if (!raw) return [
        { id: 1, nombre: 'Admin', apellido: '', email: 'admin@local', password: 'admin', role: 'admin', activo: true },
        { id: 2, nombre: 'Cliente', apellido: '', email: 'cliente@local', password: 'cliente', role: 'user', activo: true }
      ];
      return JSON.parse(raw).usuarios || [];
    } catch {
      return [
        { id: 1, nombre: 'Admin', apellido: '', email: 'admin@local', password: 'admin', role: 'admin', activo: true },
        { id: 2, nombre: 'Cliente', apellido: '', email: 'cliente@local', password: 'cliente', role: 'user', activo: true }
      ];
    }
  });

  const [usuarioLogueado, setUsuarioLogueado] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE);
      if (!raw) return null;
      return JSON.parse(raw).usuarioLogueado || null;
    } catch {
      return null;
    }
  });

  const [ordenes, setOrdenes] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE);
      if (!raw) return [];
      return JSON.parse(raw).ordenes || [];
    } catch {
      return [];
    }
  });

  // Guardar todo en localStorage automáticamente
  useEffect(() => {
    try {
      const payload = { usuarios, usuarioLogueado, ordenes };
      localStorage.setItem(STORAGE, JSON.stringify(payload));
    } catch (err) {
      console.error('No se pudo guardar usuarios en localStorage', err);
    }
  }, [usuarios, usuarioLogueado, ordenes]);

  // Registrar -> loguea automáticamente
  const register = ({ nombre = '', apellido = '', email, password }) => {
    if (!email || !password) throw new Error('Faltan datos');
    const exists = usuarios.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (exists) throw new Error('Ya existe un usuario con ese correo');
    const nuevo = { id: Date.now(), nombre, apellido, email, password, role: 'user', activo: true };
    setUsuarios(prev => [...prev, nuevo]);
    const publicUser = { id: nuevo.id, nombre: nuevo.nombre, email: nuevo.email, role: nuevo.role, apellido: nuevo.apellido };
    setUsuarioLogueado(publicUser);
    return publicUser;
  };

  // Login
  const login = ({ email, password }) => {
    if (!email || !password) throw new Error('Faltan credenciales');
    const u = usuarios.find(x => x.email.toLowerCase() === email.toLowerCase() && x.password === password && x.activo);
    if (!u) throw new Error('Credenciales inválidas');
    const publicUser = { id: u.id, nombre: u.nombre, apellido: u.apellido, email: u.email, role: u.role };
    setUsuarioLogueado(publicUser);
    return publicUser;
  };

  const logout = () => setUsuarioLogueado(null);
  const forgotPassword = (email) => usuarios.some(u => u.email.toLowerCase() === (email || '').toLowerCase());

  const addOrder = (order) => {
    const newOrder = { ...order, id: Date.now(), fecha: new Date().toISOString(), estado: 'Pendiente' };
    setOrdenes(prev => [newOrder, ...prev]);
    return newOrder;
  };

  const cancelOrder = (id) => setOrdenes(prev => prev.map(o => o.id === id ? { ...o, estado: 'Cancelado' } : o));
  const adminToggleUser = (id) => setUsuarios(prev => prev.map(u => u.id === id ? { ...u, activo: !u.activo } : u));

  // NUEVO: actualizar usuario
  const updateUsuario = (id, datos) => {
    setUsuarios(prev => prev.map(u => {
      if (u.id === id) {
        const updated = { ...u, ...datos };
        // actualizar usuario logueado si es el mismo
        if (usuarioLogueado?.id === id) {
          setUsuarioLogueado({ ...usuarioLogueado, ...datos });
        }
        return updated;
      }
      return u;
    }));
  };

  return (
    <UsuariosContext.Provider value={{
      usuarios,
      usuarioLogueado,
      register,
      login,
      logout,
      forgotPassword,
      ordenes,
      addOrder,
      cancelOrder,
      adminToggleUser,
      updateUsuario
    }}>
      {children}
    </UsuariosContext.Provider>
  );
}
