import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./admin.css";

function formatSoles(v) {
  const n = Number(v || 0);
  return n.toLocaleString("es-PE", { style: "currency", currency: "PEN", minimumFractionDigits: 2 });
}
function StatusBadge({ status }) {
  return <span className={`badge ${status}`}>{status}</span>;
}

export default function OrderDetail(){
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [working, setWorking] = useState(false);

  async function load(){
    setLoading(true);
    const res = await fetch(`/api/orders/${id}`);
    if (!res.ok) { setLoading(false); return; }
    const o = await res.json();
    setOrder(o);
    try {
      const u = await (await fetch(`/api/users/${o.userId}`)).json();
      setUser(u);
    } catch(e) {}
    setLoading(false);
  }
  useEffect(()=>{ load(); },[id]);

  async function cancel(){
    if (!order || ["DELIVERED","CANCELLED"].includes(order.status)) return;
    setWorking(true);
    await fetch(`/api/orders/${id}`, {
      method: "PATCH",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({ status: "CANCELLED" })
    });
    setWorking(false);
    load();
  }

  if (loading || !order) {
    return (
      <section className="admin-section">
        <Link to="/admin/orders" className="secondary" style={{textDecoration:"none"}}>← Volver</Link>
        <div className="loading">Cargando detalle…</div>
      </section>
    );
  }

  const canCancel = !["DELIVERED","CANCELLED"].includes(order.status);
  const items = order.items || [];
  const qty = items.reduce((s, i) => s + (i.quantity || 0), 0);

  return (
    <section className="admin-section">
      <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
        <Link to="/admin/orders" className="secondary" style={{textDecoration:"none"}}>← Volver</Link>
        <div>
          <button onClick={cancel} disabled={!canCancel || working} className={canCancel ? "" : "secondary"} style={{minWidth:140}}>
            {working ? "Cancelando…" : canCancel ? "Cancelar orden" : "No cancelable"}
          </button>
        </div>
      </div>

      <div className="card">
        <h4>Orden #{order.id}</h4>
        <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(220px,1fr))", gap:12}}>
          <div><b>Fecha:</b> <div>{new Date(order.createdAt).toLocaleString()}</div></div>
          <div><b>Estado:</b> <div><StatusBadge status={order.status} /></div></div>
          <div><b>Total:</b> <div>{formatSoles(order.total)}</div></div>
          <div><b>Items:</b> <div>{qty}</div></div>
        </div>
      </div>

      <div className="card">
        <h4>Cliente</h4>
        <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(220px,1fr))", gap:12}}>
          <div><b>Nombre:</b> <div>{user?.fullName || "—"}</div></div>
          <div><b>Email:</b> <div>{user?.email || "—"}</div></div>
          <div><b>ID usuario:</b> <div>{order.userId}</div></div>
        </div>
      </div>

      <div className="card">
        <h4>Artículos</h4>
        <div className="table-wrap">
          <table className="admin">
            <thead>
              <tr>
                <th>Producto</th>
                <th>SKU</th>
                <th>Cantidad</th>
                <th>Precio unit.</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {items.map(it => (
                <tr key={it.id}>
                  <td>{it.productName}</td>
                  <td>{it.sku || "—"}</td>
                  <td>{it.quantity}</td>
                  <td>{formatSoles(it.unitPrice)}</td>
                  <td>{formatSoles(Number(it.unitPrice) * Number(it.quantity))}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
