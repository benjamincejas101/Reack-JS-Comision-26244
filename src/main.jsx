// src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
// Importamos el proveedor del carrito
import { CarritoProvider } from './context/CarritoContext.jsx' 
import './index.css'

// 🛡️ Interceptor de seguridad para silenciar el alert de inyección automática
const alertOriginal = window.alert;
window.alert = function (mensaje) {
  if (mensaje && (mensaje.includes("inyectaron") || mensaje.includes("inyeccion"))) {
    console.log("⚡ BCD TECH: Cartel de inyección automática silenciado con éxito.");
    return; // Absorbe el cartel molesto sin abrir la ventana flotante
  }
  alertOriginal(mensaje); // Deja pasar todos los demás alerts normales de la tienda
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* Envolvemos aquí para habilitar la memoria global del carrito */}
      <CarritoProvider>
        <App />
      </CarritoProvider>
    </BrowserRouter>
  </React.StrictMode>,
)

