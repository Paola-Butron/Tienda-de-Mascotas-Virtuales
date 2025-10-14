import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function OrderDetail(){
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  async function load(){
    const res = await fetch(`/api/orders/${id}`);
    const o = await res.json();
    setOrder(o);
    const u = await (await fetch(`/api/users/${o.userId}`)).json();
    setUser(u);
  }
  useEffect(()=>{ load(); },[id]);

  async function cancel(){
    if (!order || ["DELIVERED","CANCELLED"].includes(order.status)) return;
    setLoading(true);
    await fetch(`/api/orders/${id}`, {
      method: "PATCH",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({ status: "CANCELLED" })
    });
    setLoading(false);
    load();
  }

  if(!order) return <div>Cargando...</div>;
  const canCancel = !["DELIVERED","CANCELLED"].includes(order.status);

  return (
    <div>
      <h3>Orden #{order.id}</h3>
      <p><b>Cliente:</b> {user ? `${user.fullName} (${user.email})` : order.userId}</p>
      <p><b>Estado:</b> {order.status}</p>
      <p><b>Total:</b> S/ {Number(order.total).toFixed(2)}</p>

      <h4>Items</h4>
      <ul>
        {(order.items||[]).map(it=>(
          <li key={it.id}>{it.productName} x {it.quantity} @ S/ {Number(it.unitPrice).toFixed(2)}</li>
        ))}
      </ul>

      <button disabled={!canCancel || loading} onClick={cancel}>
        {loading ? "Cancelando..." : "Cancelar orden"}
      </button>
      {!canCancel && <div style={{marginTop:8,opacity:.7}}>No se puede cancelar en estado {order.status}</div>}
    </div>
  );
}
