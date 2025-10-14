import { useEffect, useState } from "react";

export default function OrdersList(){
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("");
  const [customer, setCustomer] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  async function load(){
    const params = new URLSearchParams({ _page: page, _limit: pageSize, _sort: "createdAt", _order:"desc" });
    if (status) params.set("status", status);
    if (dateFrom) params.set("createdAt_gte", new Date(dateFrom).toISOString());
    if (dateTo) params.set("createdAt_lte", new Date(dateTo).toISOString());

    const res = await fetch(`/api/orders?${params.toString()}`);
    let data = await res.json();

    if (customer) {
      const users = await (await fetch(`/api/users?q=${encodeURIComponent(customer)}`)).json();
      const okUserIds = new Set(users.map(u=>u.id));
      data = data.filter(o=>okUserIds.has(o.userId));
    }
    setItems(data);
  }
  useEffect(()=>{ load(); },[page]);

  return (
    <div>
      <h2>Órdenes</h2>
      <div style={{display:"flex", gap:8, flexWrap:"wrap"}}>
        <select value={status} onChange={e=>setStatus(e.target.value)}>
          <option value="">Todos</option>
          <option value="PENDING">Pendiente</option>
          <option value="PAID">Pagado</option>
          <option value="SHIPPED">Enviado</option>
          <option value="DELIVERED">Entregado</option>
          <option value="CANCELLED">Cancelado</option>
        </select>
        <input placeholder="Cliente (nombre/email)" value={customer} onChange={e=>setCustomer(e.target.value)}/>
        <input type="date" value={dateFrom} onChange={e=>setDateFrom(e.target.value)}/>
        <input type="date" value={dateTo} onChange={e=>setDateTo(e.target.value)}/>
        <button onClick={()=>{ setPage(1); load(); }}>Filtrar</button>
      </div>

      <table>
        <thead><tr><th>Fecha</th><th>Cliente</th><th>Estado</th><th>Total</th><th>Items</th><th></th></tr></thead>
        <tbody>
        {items.map(o=>(
          <tr key={o.id}>
            <td>{new Date(o.createdAt).toLocaleString()}</td>
            <td>{o.userId}</td>
            <td>{o.status}</td>
            <td>S/ {Number(o.total).toFixed(2)}</td>
            <td>{o.items?.reduce((s,i)=>s+i.quantity,0) || 0}</td>
            <td><a href={`/admin/orders/${o.id}`}>Ver</a></td>
          </tr>
        ))}
        </tbody>
      </table>

      <div style={{marginTop:12}}>
        <button disabled={page<=1} onClick={()=>setPage(p=>p-1)}>Anterior</button>
        <span style={{margin:"0 8px"}}>Página {page}</span>
        <button onClick={()=>setPage(p=>p+1)}>Siguiente</button>
      </div>
    </div>
  );
}
