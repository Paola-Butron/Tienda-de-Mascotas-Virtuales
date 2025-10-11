import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { ProductosProvider } from './context/ProductosContext'
import { UsuariosProvider } from './context/UsuariosContext'
import './estilos/estilos.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <UsuariosProvider>
        <ProductosProvider>
          <App />
        </ProductosProvider>
      </UsuariosProvider>
    </BrowserRouter>
  </React.StrictMode>
)
