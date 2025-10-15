import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./admin.css";

const pageSize = 10;

function formatSoles(v) {
  const n = Number(v || 0);
  return n.toLocaleString("es-PE", { style: "currency", currency: "PEN", minimumFractionDigits: 2 });
}
function StatusBadge({ status }) {
  return <span className={`badge ${status}`}>{status}</span>;
}

export default function OrdersList() {
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("");
  const [customer, setCustomer] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(null);

  const hasCustomerFilter = customer.trim().length > 0;

  async function load() {
    setLoading(true);

    const params = new URLSearchParams({ _page: page, _limit: pageSize, _sort: "createdAt", _order: "desc" });
    if (status) params.set("status", status);
    if (dateFrom) params.set("createdAt_gte", new Date(dateFrom).toISOString());
    if (dateTo) params.set("createdAt_lte", new Date(dateTo).toISOString());

    const res = await fetch(`/api/orders?${params.toString()}`);
    let data = await res.json();

    if (hasCustomerFilter) {
      const users = await (await fetch(`/api/users?q=${encodeURIComponent(customer.trim())}`)).json();
      const ok = new Set(users.map(u => u.id));
      data = data.filter(o => ok.has(o.userId));
      setTotalCount(null);
    } else {
      const h = res.headers.get("X-Total-Count");
      setTotalCount(h ? parseInt(h, 10) : null);
    }

    setItems(data);
    setLoading(false);
  }

  useEffect(() => { load(); }, [page]);

  function applyFilters() {
    setPage(1);
    setTimeout(load, 0);
  }

  const hasRows = items && items.length > 0;
  const totalPages = totalCount ? Math.max(1, Math.ceil(totalCount / pageSize)) : null;
  const canPrev = page > 1;
  const canNext = totalPages !== null ? page < totalPages : items.length === pageSize;

  const subtotalVisible = useMemo(() => items.reduce((s, o) => s + Number(o.total || 0), 0), [items]);

  return (
    <section className="admin-section">
      <h2>Órdenes</h2>

      <div className="toolbar">
        <select value={status} onChange={e => setStatus(e.target.value)}>
          <option value="">Todos los estados</option>
          <option value="PENDING">Pendiente</option>
          <option value="PAID">Pagado</option>
          <option value="SHIPPED">Enviado</option>
          <option value="DELIVERED">Entregado</option>
          <option value="CANCELLED">Cancelado</option>
        </select>
        <input placeholder="Cliente (nombre o email)" value={customer} onChange={e => setCustomer(e.target.value)} />
        <input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)} />
        <input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)} />
        <button onClick={applyFilters}>Aplicar filtros</button>
        <button className="secondary" onClick={() => { setStatus(""); setCustomer(""); setDateFrom(""); setDateTo(""); setPage(1); setTimeout(load, 0); }}>
          Limpiar
        </button>
      </div>

      {loading && <div className="loading">Cargando órdenes…</div>}
      {!loading && !hasRows && <div className="empty">No hay órdenes que coincidan con los filtros.</div>}

      {hasRows && (
        <>
          <div className="table-wrap">
            <table className="admin">
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Cliente</th>
                  <th>Estado</th>
                  <th>Total</th>
                  <th>Items</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {items.map(o => {
                  const orderUrl = `/admin/orders/${encodeURIComponent(o.id)}`;
                  return (
                    <tr key={o.id} onClick={() => navigate(orderUrl)} style={{cursor:"pointer"}}>
                      <td>{new Date(o.createdAt).toLocaleString()}</td>
                      <td>{o.userId}</td>
                      <td><StatusBadge status={o.status} /></td>
                      <td>{formatSoles(o.total)}</td>
                      <td>{o.items?.reduce((s, i) => s + (i.quantity || 0), 0) || 0}</td>
                      <td className="actions">
                        <Link to={orderUrl} onClick={(e)=>e.stopPropagation()}>Ver</Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
            <div style={{fontSize:12, color:"#6b7280"}}>
              Mostrando {items.length} {items.length === 1 ? "orden" : "órdenes"} · Subtotal visible: {formatSoles(subtotalVisible)}
            </div>
            <div className="pager">
              <button disabled={!canPrev} onClick={() => canPrev && setPage(p => p - 1)}>← Anterior</button>
              <div>{totalPages ? `Página ${page} de ${totalPages}` : `Página ${page}`}</div>
              <button disabled={!canNext} onClick={() => canNext && setPage(p => p + 1)}>Siguiente →</button>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
