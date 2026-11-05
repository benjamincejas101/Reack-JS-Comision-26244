// src/App.jsx
import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase/config';
import { AuthProvider, useAuth } from './context/AuthContext';
import Nav from './components/layouts/Nav';
import { Asistentes } from './components/Asistentes';
import { Bienvenida } from './components/Bienvenida';
import Carrito from './pages/Carrito';
import Panel from './pages/Panel';
import Login from './pages/Login'; 
import './App.css';

// 🛡️ Componente para proteger la ruta de administrador
const RutaAdministrador = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) {
    return <h2 style={{ textAlign: 'center', marginTop: '50px', color: '#00f2fe' }}>Cargando permisos...</h2>;
  }
  if (user && user.rol === 'admin') {
    return children;
  }
  return <Navigate to="/login" replace />;
};

function AppContent() {
  const [cupones, setCupones] = useState([]);
  const [cuponAplicado, setCuponAplicado] = useState(null); // 🎟️ Estado dinámico para el cupón activo

  // Sincronizar el estado inicial con localStorage al montar el componente
  useEffect(() => {
    const fetchCupones = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'cupones'));
        const docs = querySnapshot.docs.map(docSnap => ({
          id: docSnap.id,
          ...docSnap.data(),
        }));
        setCupones(docs);
      } catch (err) {
        console.error('Error al obtener cupones para el footer:', err);
      }
    };
    
    fetchCupones();
    
    // Verificamos si ya había un cupón guardado anteriormente
    const guardado = localStorage.getItem('cuponActivo');
    if (guardado) {
      setCuponAplicado(guardado);
    }
  }, []);

  // Función para aplicar un cupón
  const handleAplicarCupon = (cupon) => {
    localStorage.setItem('cuponActivo', cupon.codigo);
    localStorage.setItem('descuentoCupon', cupon.descuento);
    setCuponAplicado(cupon.codigo);
    alert(`¡Cupón ${cupon.codigo} aplicado con éxito! Revisá tu carrito para ver el descuento.`);
  };

  // Función para quitar el cupón activo
  const handleQuitarCupon = () => {
    localStorage.removeItem('cuponActivo');
    localStorage.removeItem('descuentoCupon');
    setCuponAplicado(null);
    alert('Cupón removido correctamente.');
  };

  return (
    <div className="app-container" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#000' }}>
      <Nav />
      
      <main className="main-content" style={{ 
        flex: 1, 
        width: '100%', 
        maxWidth: '1400px', 
        margin: '0 auto',   
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
            element={
              <RutaAdministrador>
                <Panel />
              </RutaAdministrador>
            } 
          />
          <Route path="*" element={<h2 style={{ textAlign: 'center', marginTop: '50px', color: '#fff' }}>404 - Página no encontrada</h2>} />
        </Routes>
      </main>

      {/* 🚀 FOOTER GAMER OPTIMIZADO CON CUPONES INTERACTIVOS (APLICAR / QUITAR) */}
      <footer className="gamer-footer" style={{ backgroundColor: '#0b0b0b', padding: '30px 40px', position: 'relative', borderTop: '1px solid #1a1a1a', marginTop: '40px' }}>
        <div className="footer-line"></div>
        <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
          
          {/* 🎟️ SECCIÓN VISUAL DE CUPONES COMPACTA */}
          {cupones.length > 0 && (
            <div style={{ marginBottom: '30px', paddingBottom: '20px', borderBottom: '1px solid #1a1a1a' }}>
              <h4 style={{ color: '#00f2fe', margin: '0 0 15px 0', fontSize: '1rem', letterSpacing: '1px', textTransform: 'uppercase' }}>
                🎟️ Cupones de Descuento Activos
              </h4>
              <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                {cupones.map(cupon => {
                  const esEsteCuponActivo = cuponAplicado === cupon.codigo;

                  return (
                    <div 
                      key={cupon.id} 
                      style={{ 
                        backgroundColor: '#111', 
                        border: esEsteCuponActivo ? '1px solid #00f2fe' : '1px dashed #333', 
                        borderLeft: esEsteCuponActivo ? '4px solid #00f2fe' : '4px solid #555', 
                        padding: '10px 20px', 
                        borderRadius: '6px', 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '15px',
                        boxShadow: esEsteCuponActivo ? '0 0 12px rgba(0, 242, 254, 0.3)' : '0 2px 8px rgba(0,0,0,0.4)',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        <span style={{ fontFamily: 'monospace', fontWeight: 'bold', color: '#fff', fontSize: '1.1rem', letterSpacing: '0.5px' }}>
                          {cupon.codigo}
                        </span>
                        <span style={{ color: '#00f2fe', fontWeight: 'bold', fontSize: '0.9rem', backgroundColor: 'rgba(0, 242, 254, 0.1)', padding: '2px 6px', borderRadius: '4px', width: 'fit-content' }}>
                          -{cupon.descuento}%
                        </span>
                      </div>

                      {/* ✨ Botón inteligente para Aplicar o Quitar el cupón */}
                      {esEsteCuponActivo ? (
                        <button
                          onClick={handleQuitarCupon}
                          style={{
                            backgroundColor: '#ff4d4d',
                            color: '#fff',
                            border: 'none',
                            padding: '6px 12px',
                            borderRadius: '4px',
                            fontWeight: 'bold',
                            fontSize: '0.85rem',
                            cursor: 'pointer',
                            boxShadow: '0 0 8px rgba(255, 77, 77, 0.3)'
                          }}
                        >
                          Quitar
                        </button>
                      ) : (
                        <button
                          onClick={() => handleAplicarCupon(cupon)}
                          disabled={cuponAplicado !== null} // Bloquea los demás si ya hay uno activo
                          style={{
                            backgroundColor: cuponAplicado !== null ? '#333' : '#00f2fe',
                            color: cuponAplicado !== null ? '#777' : '#000',
                            border: 'none',
                            padding: '6px 12px',
                            borderRadius: '4px',
                            fontWeight: 'bold',
                            fontSize: '0.85rem',
                            cursor: cuponAplicado !== null ? 'not-allowed' : 'pointer',
                            boxShadow: cuponAplicado !== null ? 'none' : '0 0 8px rgba(0, 242, 254, 0.3)'
                          }}
                        >
                          Aplicar
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* CONTENIDO DEL FOOTER ORIGINAL */}
          <div className="footer-content" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
            <div style={{ textAlign: 'left' }}>
              <span style={{ 
                color: '#00f2fe', 
                fontWeight: '900', 
                fontSize: '1.2rem', 
                letterSpacing: '1px',
                textShadow: '0 0 10px rgba(0, 242, 254, 0.4)' 
              }}>
                ⚡ BCD TECH
              </span>
              <p style={{ margin: '8px 0 0 0', color: '#dddddd', fontSize: '0.95rem', maxWidth: '450px', lineHeight: '1.5' }}>
                Tu hub de tecnología y hardware de vanguardia. Elevando la experiencia de juego con componentes electrónicos seleccionados por profesionales.
              </p>
            </div>
            
            <div style={{ textAlign: 'right', fontSize: '0.95rem', color: '#bbbbbb' }}>
              <p style={{ margin: 0, fontWeight: '500' }}>© 2026 BCD TECH. All rights reserved.</p>
              <p style={{ margin: '6px 0 0 0', fontSize: '0.8rem', color: '#00f2fe', opacity: 0.8, fontWeight: 'bold' }}>Powered by Firebase & React</p>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}

// 📦 Envolvemos toda nuestra estructura dentro del AuthProvider global
function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
