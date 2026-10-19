// src/App.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import Nav from './components/layouts/Nav';
import { Asistentes } from './components/Asistentes';
import { Bienvenida } from './components/Bienvenida';
import Carrito from './pages/Carrito';
import Panel from './pages/Panel';
import Login from './pages/Login'; 
import './App.css';

function App() {
  const esAdmin = localStorage.getItem('isAdmin') === 'true';

  return (
    <div className="app-container" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#000' }}>
      <Nav />
      
      {/* SE OPTIMIZÓ EL MAIN: Ahora se expande hasta 1400px en PC y se centra de forma automática */}
      <main className="main-content" style={{ 
        flex: 1, 
        width: '100%', 
        maxWidth: '1400px', // Permite que la app se estire en pantallas de PC
        margin: '0 auto',   // Centra todo el contenido cuando la pantalla es gigante
        padding: '20px',
        boxSizing: 'border-box'
      }}>
        <Routes>
          <Route path="/" element={<Bienvenida nombreUsuario="Gamer" />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/contacto" element={<Asistentes />} />
          <Route path="/login" element={<Login />} />
          
          <Route 
            path="/cargar-producto" 
            element={esAdmin ? <Panel /> : <Navigate to="/login" replace />} 
          />
          
          <Route path="*" element={<h2 style={{ textAlign: 'center', marginTop: '50px', color: '#fff' }}>404 - Página no encontrada</h2>} />
        </Routes>
      </main>

      {/* FOOTER GAMER OPTIMIZADO PARA MÁXIMA VISIBILIDAD */}
      <footer className="gamer-footer" style={{ backgroundColor: '#0b0b0b', padding: '30px 40px', position: 'relative', borderTop: '1px solid #1a1a1a' }}>
        <div className="footer-line"></div>
        <div className="footer-content" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1300px', margin: '0 auto', flexWrap: 'wrap', gap: '20px' }}>
          
          {/* Columna Izquierda: Descripción de la tienda */}
          <div style={{ textAlign: 'left' }}>
            <span style={{ 
              color: '#00f2fe', 
              fontWeight: '900', 
              fontSize: '1.2rem', 
              letterSpacing: '1px',
              textShadow: '0 0 10px rgba(0, 242, 254, 0.4)' // Efecto brillo cian
            }}>
              ⚡ BCD TECH
            </span>
            <p style={{ margin: '8px 0 0 0', color: '#dddddd', fontSize: '0.95rem', maxWidth: '450px', lineHeight: '1.5' }}>
              Tu hub de tecnología y hardware de vanguardia. Elevando la experiencia de juego con componentes electrónicos seleccionados por profesionales.
            </p>
          </div>
          
          {/* Columna Derecha: Créditos y Copyright */}
          <div style={{ textAlign: 'right', fontSize: '0.95rem', color: '#bbbbbb' }}>
            <p style={{ margin: 0, fontWeight: '500' }}>© 2026 BCD TECH. All rights reserved.</p>
            <p style={{ margin: '6px 0 0 0', fontSize: '0.8rem', color: '#00f2fe', opacity: 0.8, fontWeight: 'bold' }}>Powered by Firebase & React</p>
          </div>

        </div>
      </footer>
    </div>
  );
}

export default App;
