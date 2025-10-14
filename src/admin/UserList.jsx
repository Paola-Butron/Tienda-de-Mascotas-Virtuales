import { useEffect, useState } from "react";

export default function UsersList() {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("");
  const [isActive, setIsActive] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  async function load() {
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (isActive) params.set("isActive", isActive);
    params.set("_page", page);
    params.set("_limit", pageSize);
    const res = await fetch(`/api/users?${params.toString()}`);
    setItems(await res.json());
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

  return (
    <div>
      <h2>Usuarios</h2>
      <div style={{display:"flex", gap:8}}>
        <input placeholder="Buscar nombre o email" value={query} onChange={e=>setQuery(e.target.value)} />
        <select value={isActive} onChange={e=>setIsActive(e.target.value)}>
          <option value="">Todos</option>
          <option value="true">Activos</option>
          <option value="false">Inactivos</option>
        </select>
        <button onClick={()=>{ setPage(1); load(); }}>Buscar</button>
      </div>

      <table>
        <thead><tr><th>Email</th><th>Nombre</th><th>Rol</th><th>Estado</th><th></th></tr></thead>
        <tbody>
        {items.map(u=>(
          <tr key={u.id}>
            <td>{u.email}</td>
            <td>{u.fullName}</td>
            <td>{u.role}</td>
            <td>{u.isActive ? "Activo" : "Inactivo"}</td>
            <td>
              <a href={`/admin/users/${u.id}`}>Ver</a>
              <button onClick={()=>toggle(u.id, u.isActive)} style={{marginLeft:8}}>
                {u.isActive ? "Desactivar" : "Activar"}
              </button>
            </td>
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
