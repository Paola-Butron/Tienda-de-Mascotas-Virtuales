import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./users.css";

const pageSize = 10;

export default function UsersList() {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("");
  const [isActive, setIsActive] = useState("");
  const [page, setPage] = useState(1);

  async function load() {
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (isActive) params.set("isActive", isActive);
    params.set("_page", page);
    params.set("_limit", pageSize);
    const res = await fetch(`/api/users?${params.toString()}`);
    const data = await res.json();
    setItems(data);
  }

  useEffect(()=>{ load(); }, [page]);

  async function toggle(id, active) {
    await fetch(`/api/users/${id}`, {
      method: "PATCH",
      headers: { "Content-Type":"application/json" },
      body: JSON.stringify({ isActive: !active })
    });
    load();
  }

  const canPrev = page > 1;
  const canNext = items.length === pageSize;

  return (
    <section className="admin-users">
      <h2>Usuarios</h2>

      <div className="users-toolbar">
        <input placeholder="Buscar nombre o email" value={query} onChange={e=>setQuery(e.target.value)} />
        <select value={isActive} onChange={e=>setIsActive(e.target.value)}>
          <option value="">Todos</option>
          <option value="true">Activos</option>
          <option value="false">Inactivos</option>
        </select>
        <button onClick={()=>{ setPage(1); load(); }}>Buscar</button>
        <button className="secondary" onClick={()=>{ setQuery(""); setIsActive(""); setPage(1); setTimeout(load,0); }}>Limpiar</button>
      </div>

      <div className="users-tablewrap">
        <table className="users">
          <thead><tr><th>Email</th><th>Nombre</th><th>Rol</th><th>Estado</th><th></th></tr></thead>
          <tbody>
          {items.map(u=>(
            <tr key={u.id}>
              <td>{u.email}</td>
              <td>{u.fullName}</td>
              <td>{u.role}</td>
              <td>
                <span className={`badge-state ${u.isActive ? "active":"inactive"}`}>
                  {u.isActive ? "Activo" : "Inactivo"}
                </span>
              </td>
              <td>
                <Link to={`/admin/users/${u.id}`}>Ver</Link>
                <button onClick={()=>toggle(u.id, u.isActive)} style={{marginLeft:8}}>
                  {u.isActive ? "Desactivar" : "Activar"}
                </button>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>

      <div className="users-pager">
        <button disabled={!canPrev} onClick={()=> setPage(p=>p-1)}>← Anterior</button>
        <div>Página {page}</div>
        <button disabled={!canNext} onClick={()=> setPage(p=>p+1)}>Siguiente →</button>
      </div>
    </section>
  );
}
