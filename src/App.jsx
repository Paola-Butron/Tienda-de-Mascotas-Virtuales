import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './componentes/Navbar';
import ScrollToTop from './componentes/ScrollToTop';
import Footer from './componentes/Footer';
import Inicio from './paginas/Inicio';
import Productos from './paginas/Productos';
import SearchResults from './paginas/SearchResults';
import DetalleProducto from './paginas/DetalleProducto';
import NuevoProducto from './paginas/NuevoProducto';
import EditarProducto from './paginas/EditarProducto';
import Carrito from './paginas/Carrito';
import Checkout from './paginas/Checkout';
import OrderComplete from './paginas/OrderComplete';
import OrderDetail from './paginas/OrderDetail'; 
import Login from './paginas/Login';
import Register from './paginas/Register';
import Account from './paginas/Account';
import EditarPerfil from './paginas/EditarPerfil';
import CambiarPassword from './paginas/CambiarPassword.jsx';
import ForgotPassword from './paginas/ForgotPassword';
import AdminDashboard from './paginas/admin/AdminDashboard';
import AdminProductos from './paginas/admin/AdminProductos';
import AdminUsuarios from './paginas/admin/AdminUsuarios';
import Categorias from './paginas/admin/Categorias';
import NotFound from './paginas/NotFound';
import Pomodoro from './paginas/Pomodoro';
import Shimeji from './paginas/Shimejis';
import StillWorking from './paginas/StillWorking';

export default function App() {
  const location = useLocation();
  const sinFooter = ["/pomodoro"];

  return (
    <div className="app-root">
      <Navbar />
      <ScrollToTop />
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
          <Route path="/orden/:id" element={<OrderDetail />} /> 

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/mi-cuenta" element={<Account />} />
          <Route path="/editar-perfil" element={<EditarPerfil />} />
          <Route path="/cambiar-password" element={<CambiarPassword />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/productos" element={<AdminProductos />} />
          <Route path="/admin/usuarios" element={<AdminUsuarios />} />
          <Route path="/admin/categorias" element={<Categorias />} />

          <Route path="/pomodoro" element={<Pomodoro />} />
          <Route path="/shimejis" element={<Shimeji />} />
          <Route path="/still-working" element={<StillWorking />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!sinFooter.includes(location.pathname) && <Footer />}
    </div>
  );
}

