// src/App.jsx
import { Routes, Route, Navigate, Link } from 'react-router-dom'; // Importamos Link
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
    <div className="app-container" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Nav />
      
      {/* Contenedor principal que ocupa el espacio intermedio */}
      <main className="main-content" style={{ flex: 1 }}>
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

      {/* PIE DE PÁGINA ESTRECHO Y DISCRETO */}
      <footer style={{ backgroundColor: '#050505', padding: '15px 30px', textAlign: 'center', borderTop: '1px solid #111', marginTop: '40px' }}>
        <p style={{ color: '#444', margin: 0, fontSize: '0.85rem' }}>
          © 2026 BCD TECH. 
          {/* Si no estás logueado como admin, muestra el acceso aquí abajo */}
          {!esAdmin && (
            <Link to="/login" style={{ color: '#555', textDecoration: 'none', marginLeft: '15px', fontSize: '0.8rem', transition: '0.2s' }} onMouseOver={(e) => e.target.style.color = '#00f2fe'} onMouseOut={(e) => e.target.style.color = '#555'}>
              🔒 Acceso del Personal
            </Link>
          )}
        </p>
      </footer>
    </div>
  );
}

export default App;
