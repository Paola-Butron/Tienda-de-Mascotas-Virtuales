import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUsuarios } from "../context/UsuariosContext";
import "./OrderDetail.css";

export default function OrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { ordenes, cancelOrder } = useUsuarios();

  const orden = ordenes.find((o) => String(o.id) === String(id));

  if (!orden) {
    return (
      <section className="order-detail card">
        <h2> Orden no encontrada</h2>
        <button onClick={() => navigate("/mi-cuenta")} className="btn volver">
          Volver a mi cuenta
        </button>
      </section>
    );
  }

  const handleCancel = () => {
    if (orden.estado !== "Pendiente") {
      alert("Solo puedes cancelar órdenes pendientes 🐾");
      return;
    }
    if (window.confirm("¿Seguro que deseas cancelar esta orden?")) {
      cancelOrder(orden.id);
      alert("Orden cancelada 🐶");
    }
  };

  return (
    <section className="order-detail card">
      <h1>📦 Detalle de la orden #{orden.id}</h1>
      <p><strong>Fecha:</strong> {new Date(orden.fecha).toLocaleString()}</p>
      <p><strong>Estado:</strong> {orden.estado}</p>
      <p><strong>Total:</strong> S/ {orden.total}</p>

      <h3>🛒 Productos</h3>
      <ul className="order-items">
        {orden.items.map((it) => (
          <li key={it.id}>
            {it.nombre} x{it.cantidad} — S/ {(it.precio * it.cantidad).toFixed(2)}
          </li>
        ))}
      </ul>

      <h3>🚚 Envío</h3>
      <p><strong>Nombre:</strong> {orden.envio?.nombre}</p>
      <p><strong>Dirección:</strong> {orden.envio?.direccion}</p>
      <p><strong>Ciudad:</strong> {orden.envio?.ciudad}</p>
      <p><strong>Método:</strong> {orden.envio?.metodo === "tienda" ? "Recoger en tienda" : "Delivery"}</p>

      <h3>💳 Pago</h3>
      <p><strong>Método:</strong> {orden.pago?.metodo === "tarjeta" ? "Tarjeta" : "Código QR"}</p>

      <div className="order-actions">
        <button onClick={() => navigate("/mi-cuenta")} className="btn volver">
          Volver a mi cuenta
        </button>

        {orden.estado === "Pendiente" && (
          <button onClick={handleCancel} className="btn cancelar">
            Cancelar orden
          </button>
        )}
      </div>
    </section>
  );
}

