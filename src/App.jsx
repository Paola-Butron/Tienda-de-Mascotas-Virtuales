import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './componentes/Navbar'
import Inicio from './paginas/Inicio'
import Productos from './paginas/Productos'
import SearchResults from './paginas/SearchResults'
import DetalleProducto from './paginas/DetalleProducto'
import NuevoProducto from './paginas/NuevoProducto'
import EditarProducto from './paginas/EditarProducto'
import Carrito from './paginas/Carrito'
import Checkout from './paginas/Checkout'
import OrderComplete from './paginas/OrderComplete'
import Login from './paginas/Login'
import Register from './paginas/Register'
import Account from './paginas/Account'
import OrderDetail from './paginas/OrderDetail'
import AdminDashboard from './paginas/admin/AdminDashboard'
import AdminProductos from './paginas/admin/AdminProductos'
import AdminUsuarios from './paginas/admin/AdminUsuarios'
import Categorias from './paginas/admin/Categorias'

export default function App(){
  return (
    <div className="app-root">
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/buscar" element={<SearchResults />} />
          <Route path="/productos/nuevo" element={<NuevoProducto />} />
          <Route path="/productos/:id/editar" element={<EditarProducto />} />
          <Route path="/productos/:id" element={<DetalleProducto />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-complete" element={<OrderComplete />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/mi-cuenta" element={<Account />} />
          <Route path="/orden/:id" element={<OrderDetail />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/productos" element={<AdminProductos />} />
          <Route path="/admin/usuarios" element={<AdminUsuarios />} />
          <Route path="/admin/categorias" element={<Categorias />} />
        </Routes>
      </main>
    </div>
  )
}
