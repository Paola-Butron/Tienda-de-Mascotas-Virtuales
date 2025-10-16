import { createContext, useContext, useEffect, useState } from 'react';
import sample from '../utils/sampleProducts';

const ProductosContext = createContext();
export const useProductos = () => {
  const ctx = useContext(ProductosContext);
  if (!ctx) throw new Error('useProductos debe usarse dentro de ProductosProvider');
  return ctx;
};

const STORAGE = 'tienda_mascotas_full_v1';

export function ProductosProvider({ children }) {
  const [productos, setProductos] = useState(() => {
    try { 
      const raw = localStorage.getItem(STORAGE); 
      if (!raw) return sample; 
      const p = JSON.parse(raw); 
      return p.productos || sample; 
    } catch { 
      return sample; 
    }
  });

  const [carrito, setCarrito] = useState(() => {
    try { 
      const raw = localStorage.getItem(STORAGE); 
      if (!raw) return []; 
      const p = JSON.parse(raw); 
      return p.carrito || []; 
    } catch { 
      return []; 
    }
  });

  const [guardados, setGuardados] = useState(() => {
    try { 
      const raw = localStorage.getItem(STORAGE); 
      if (!raw) return []; 
      const p = JSON.parse(raw); 
      return p.guardados || []; 
    } catch { 
      return []; 
    }
  });

  const [categorias, setCategorias] = useState(() => {
    try { 
      const raw = localStorage.getItem(STORAGE); 
      if (!raw) return []; 
      const p = JSON.parse(raw); 
      return p.categorias || []; 
    } catch { 
      return []; 
    }
  });

  useEffect(() => {
    if (categorias.length === 0) {
      setCategorias(['Brainy', 'Techy', 'Cuddly', 'Questy', 'Arty', 'Herity']);
    }
  }, []);

  useEffect(() => {
    const payload = { productos, carrito, guardados, categorias };
    localStorage.setItem(STORAGE, JSON.stringify(payload));
  }, [productos, carrito, guardados, categorias]);

  const productosConDescuento = productos.map(p => {
    if (p.categoria?.toLowerCase() === "brainy") {
      return {
        ...p,
        precioDescuento: +(p.precio * 0.7).toFixed(2),
        tieneDescuento: true
      };
    }
    return { 
      ...p, 
      precioDescuento: p.precio, 
      tieneDescuento: false 
    };
  });

  // ----- FUNCIONES DE GESTIÓN DE PRODUCTOS -----
  const agregarProducto = (producto) => 
    setProductos(prev => [...prev, { ...producto, id: Date.now(), activo: true }]);

  const eliminarProducto = (id) => { 
    setProductos(prev => prev.filter(p => p.id !== id)); 
    setCarrito(prev => prev.filter(i => i.id !== id)); 
    setGuardados(prev => prev.filter(i => i.id !== id)); 
  };

  const actualizarProducto = (prod) => 
    setProductos(prev => prev.map(p => p.id === prod.id ? prod : p));

  const toggleActivo = (id) => 
    setProductos(prev => prev.map(p => p.id === id ? { ...p, activo: !p.activo } : p));

  // ----- FUNCIONES DEL CARRITO -----
  const agregarAlCarrito = (producto, cantidad = 1) => {
    const p = productos.find(x => x.id === producto.id);
    if (!p || p.activo === false) return;
    setCarrito(prev => {
      const found = prev.find(i => i.id === producto.id);
      if (found) {
        return prev.map(i => i.id === producto.id ? { ...i, cantidad: i.cantidad + cantidad } : i);
      }
      return [...prev, { ...producto, cantidad }];
    });
  };

  const quitarDelCarrito = (id) => 
    setCarrito(prev => prev.filter(i => i.id !== id));

  const cambiarCantidad = (id, cantidad) => 
    setCarrito(prev => prev.map(i => i.id === id ? { ...i, cantidad } : i));

  // ----- FUNCIONES DE GUARDADOS -----
  const guardarParaDespues = (id) => {
    const item = carrito.find(i => i.id === id);
    if (!item) return;
    setGuardados(prev => [...prev, item]);
    setCarrito(prev => prev.filter(i => i.id !== id));
  };

  const regresarAlCarrito = (id) => {
    const item = guardados.find(i => i.id === id);
    if (!item) return;
    setGuardados(prev => prev.filter(g => g.id !== id));
    setCarrito(prev => [...carrito, item]);
  };

  const eliminarGuardado = (id) => 
    setGuardados(prev => prev.filter(i => i.id !== id));

  const agregarCategoria = (nombre) => 
    setCategorias(prev => [...prev, nombre]);

  return (
    <ProductosContext.Provider value={{
      productos: productosConDescuento,
      agregarProducto, eliminarProducto, actualizarProducto, toggleActivo,
      carrito, agregarAlCarrito, quitarDelCarrito, cambiarCantidad,
      guardados, guardarParaDespues, regresarAlCarrito, eliminarGuardado,
      categorias, agregarCategoria
    }}>
      {children}
    </ProductosContext.Provider>
  );
}
