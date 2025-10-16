import { createContext, useContext, useEffect, useState } from "react";

const UsuariosContext = createContext();

export const useUsuarios = () => {
  const ctx = useContext(UsuariosContext);
  if (!ctx) throw new Error("useUsuarios debe usarse dentro de UsuariosProvider");
  return ctx;
};

const STORAGE = "tienda_mascotas_full_users_v1";

export function UsuariosProvider({ children }) {
  const [usuarios, setUsuarios] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE);
      if (!raw)
        return [
          {
            id: 1,
            nombre: "Admin",
            apellido: "",
            email: "admin@local",
            password: "admin",
            role: "admin",
            activo: true,
          },
          {
            id: 2,
            nombre: "Cliente",
            apellido: "",
            email: "cliente@local",
            password: "cliente",
            role: "user",
            activo: true,
          },
        ];
      return JSON.parse(raw).usuarios || [];
    } catch {
      return [];
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

  useEffect(() => {
    const payload = { usuarios, usuarioLogueado, ordenes };
    localStorage.setItem(STORAGE, JSON.stringify(payload));
  }, [usuarios, usuarioLogueado, ordenes]);


  const register = ({ nombre = "", apellido = "", email, password }) => {
    if (!email || !password) throw new Error("Faltan datos");
    const exists = usuarios.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );
    if (exists) throw new Error("Ya existe un usuario con ese correo");

    const nuevo = {
      id: Date.now(),
      nombre,
      apellido,
      email,
      password,
      role: "user",
      activo: true,
    };

    setUsuarios((prev) => [...prev, nuevo]);

    const publicUser = {
      id: nuevo.id,
      nombre: nuevo.nombre,
      apellido: nuevo.apellido,
      email: nuevo.email,
      role: nuevo.role,
    };

    setUsuarioLogueado(publicUser);
    return publicUser;
  };

  const login = ({ email, password }) => {
    const data = JSON.parse(localStorage.getItem(STORAGE));
    if (!data || !data.usuarios) throw new Error("No hay usuarios registrados");

    const usuario = data.usuarios.find(
      (u) => u.email === email && u.password === password
    );
    if (!usuario) throw new Error("Credenciales inválidas");

    const publicUser = {
      id: usuario.id,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      email: usuario.email,
      role: usuario.role,
    };

    setUsuarioLogueado(publicUser);
    const updatedData = { ...data, usuarioLogueado: publicUser };
    localStorage.setItem(STORAGE, JSON.stringify(updatedData));

    return publicUser;
  };

  const logout = () => {
    setUsuarioLogueado(null);
    const data = JSON.parse(localStorage.getItem(STORAGE));
    if (data) {
      delete data.usuarioLogueado;
      localStorage.setItem(STORAGE, JSON.stringify(data));
    }
  };

  const forgotPassword = (email) =>
    usuarios.some(
      (u) => u.email.toLowerCase() === (email || "").toLowerCase()
    );

  const addOrder = (order) => {
    const newOrder = {
      ...order,
      id: Date.now(),
      fecha: new Date().toISOString(),
      estado: "Pendiente",
    };
    setOrdenes((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  const cancelOrder = (id) =>
    setOrdenes((prev) =>
      prev.map((o) => (o.id === id ? { ...o, estado: "Cancelado" } : o))
    );

  const adminToggleUser = (id) =>
    setUsuarios((prev) =>
      prev.map((u) => (u.id === id ? { ...u, activo: !u.activo } : u))
    );

  const updateUsuario = (id, datos) => {
    setUsuarios((prev) =>
      prev.map((u) => {
        if (u.id === id) {
          const updated = { ...u, ...datos };
          if (usuarioLogueado?.id === id) {
            const updatedLogueado = { ...usuarioLogueado, ...datos };
            setUsuarioLogueado(updatedLogueado);
            const data = JSON.parse(localStorage.getItem(STORAGE)) || {};
            data.usuarioLogueado = updatedLogueado;
            localStorage.setItem(STORAGE, JSON.stringify(data));
          }
          return updated;
        }
        return u;
      })
    );
  };

  return (
    <UsuariosContext.Provider
      value={{
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
        updateUsuario,
      }}
    >
      {children}
    </UsuariosContext.Provider>
  );
}
