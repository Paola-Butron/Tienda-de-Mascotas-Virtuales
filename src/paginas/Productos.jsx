import React, { useState } from 'react';
import { useProductos } from '../context/ProductosContext';
import ProductoItem from '../componentes/ProductoItem';

function Paginate({ itemsPerPage, items, render }) {
  const [page, setPage] = useState(1);
  const total = Math.max(1, Math.ceil(items.length / itemsPerPage));
  const start = (page - 1) * itemsPerPage;
  const pageItems = items.slice(start, start + itemsPerPage);

  return (
    <div>
      <div>{render(pageItems)}</div>
      <div style={{ marginTop: 12 }}>
        <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>Anterior</button>
        <span style={{ margin: '0 8px' }}>Página {page} / {total}</span>
        <button onClick={() => setPage(p => Math.min(total, p + 1))} disabled={page === total}>Siguiente</button>
      </div>
    </div>
  );
}

export default function Productos() {
  const { productos } = useProductos();
  const activos = productos.filter(p => p.activo);

  if (!activos.length) return <div>No hay productos disponibles</div>;

  return (
    <section className="productos">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Catálogo de productos</h1>
        <button>Agregar producto</button>
      </div>

      <Paginate
        itemsPerPage={12}
        items={activos}
        render={(items) => (
          <ul className="lista-productos">
            {items.map(p => <ProductoItem key={p.id} producto={p} />)}
          </ul>
        )}
      />
    </section>
  );
}
