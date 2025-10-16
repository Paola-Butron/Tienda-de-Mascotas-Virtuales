import React, { useState } from "react";
import { useProductos } from "../context/ProductosContext";
import { useUsuarios } from "../context/UsuariosContext";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { carrito, limpiarCarrito } = useProductos();
  const { usuarioLogueado, addOrder } = useUsuarios();
  const navigate = useNavigate();

  const [envio, setEnvio] = useState({
    nombre: "",
    direccion: "",
    ciudad: "",
    metodo: "delivery",
  });
  const [pago, setPago] = useState({ metodo: "qr", tarjeta: "" });

  const total = carrito
    .reduce((s, i) => s + i.precio * (i.cantidad || 1), 0)
    .toFixed(2);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!usuarioLogueado) {
      alert("Debes iniciar sesión para completar la compra");
      navigate("/login");
      return;
    }

    if (!envio.nombre || !envio.direccion || !envio.ciudad) {
      alert("Completa todos los datos de envío");
      return;
    }

    const order = {
      usuarioId: usuarioLogueado.id,
      items: carrito,
      envio,
      pago,
      total,
    };

    const newOrder = addOrder(order); 
    limpiarCarrito && limpiarCarrito(); 
    alert(`Orden creada con éxito 🐾 (ID: ${newOrder.id})`);

    navigate("/order-complete");
  };

  return (
    <section className="checkout">
      <h1>Checkout</h1>
      <div style={{ display: "flex", gap: 24 }}>
        <form onSubmit={handleSubmit} style={{ flex: 1 }} className="card">
          <h3>Dirección de envío</h3>
          <input
            placeholder="Nombre"
            value={envio.nombre}
            onChange={(e) => setEnvio({ ...envio, nombre: e.target.value })}
          />
          <input
            placeholder="Dirección"
            value={envio.direccion}
            onChange={(e) => setEnvio({ ...envio, direccion: e.target.value })}
          />
          <input
            placeholder="Ciudad"
            value={envio.ciudad}
            onChange={(e) => setEnvio({ ...envio, ciudad: e.target.value })}
          />

          <h3>Método de envío</h3>
          <label>
            <input
              type="radio"
              name="metodoEnvio"
              checked={envio.metodo === "delivery"}
              onChange={() => setEnvio({ ...envio, metodo: "delivery" })}
            />{" "}
            Delivery a domicilio
          </label>
          <label style={{ marginLeft: 12 }}>
            <input
              type="radio"
              name="metodoEnvio"
              checked={envio.metodo === "tienda"}
              onChange={() => setEnvio({ ...envio, metodo: "tienda" })}
            />{" "}
            Recoger en tienda
          </label>

          <h3>Método de pago</h3>
          <label>
            <input
              type="radio"
              name="pago"
              checked={pago.metodo === "qr"}
              onChange={() => setPago({ ...pago, metodo: "qr" })}
            />{" "}
            Código QR
          </label>
          <label style={{ marginLeft: 12 }}>
            <input
              type="radio"
              name="pago"
              checked={pago.metodo === "tarjeta"}
              onChange={() => setPago({ ...pago, metodo: "tarjeta" })}
            />{" "}
            Tarjeta
          </label>

          {pago.metodo === "qr" ? (
            <div>
              <img
                src="/images/qr.svg"
                alt="QR"
                style={{ width: 140, marginTop: 8 }}
              />
              <p>Escanea y paga (simulado)</p>
            </div>
          ) : (
            <div>
              <input placeholder="Número de tarjeta" />
              <input placeholder="MM/AA" />
              <input placeholder="CVC" />
            </div>
          )}

          <div style={{ marginTop: 12 }}>
            <button type="submit">Completar orden</button>
          </div>
        </form>

        <aside style={{ width: 360 }} className="card">
          <h3>Resumen del pedido</h3>
          <ul>
            {carrito.map((i) => (
              <li
                key={i.id}
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                {i.nombre} x{i.cantidad}{" "}
                <span>S/ {(i.precio * i.cantidad).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <h4>Total: S/ {total}</h4>
        </aside>
      </div>
    </section>
  );
}

