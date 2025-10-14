import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function UserDetail(){
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(()=>{
    (async ()=>{
      const res = await fetch(`/api/users/${id}`);
      setUser(await res.json());
    })();
  },[id]);

  if(!user) return <div>Cargando...</div>;
  return (
    <div>
      <h3>Usuario</h3>
      <p><b>ID:</b> {user.id}</p>
      <p><b>Nombre:</b> {user.fullName}</p>
      <p><b>Email:</b> {user.email}</p>
      <p><b>Rol:</b> {user.role}</p>
      <p><b>Estado:</b> {user.isActive ? "Activo":"Inactivo"}</p>
      <p><b>Creado:</b> {new Date(user.createdAt).toLocaleString()}</p>
    </div>
  );
}
