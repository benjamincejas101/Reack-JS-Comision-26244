// src/components/layouts/Nav.jsx
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCarrito } from '../../context/CarritoContext';
import { useAuth } from '../../context/AuthContext';

export const Nav = () => {
  const { cantidadTotal } = useCarrito();
  const navigate = useNavigate();
  const { user, logout } = useAuth(); 

  // Estado dinámico para saber si estamos en celular o computadora
  const [esMovil, setEsMovil] = useState(window.innerWidth < 768);

  useEffect(() => {
    const controlarAncho = () => setEsMovil(window.innerWidth < 768);
    window.addEventListener('resize', controlarAncho);
    return () => window.removeEventListener('resize', controlarAncho);
  }, []);

  const cerrarSesion = async () => {
    try {
      await logout();
      alert('Sesión cerrada.');
      navigate('/');
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  // Estilos responsivos dinámicos
  const linkStyle = {
    color: '#fff',
    textDecoration: 'none',
    fontSize: esMovil ? '0.85rem' : '1.1rem', // Más chico en celus
    fontWeight: '800',   
    letterSpacing: '0.5px',
    transition: 'all 0.2s ease-in-out'
  };

  return (
    <nav style={{ 
      display: 'flex', 
      flexDirection: esMovil ? 'column' : 'row', // Se apila en dos pisos si es celu
      justifyContent: 'space-between', 
      alignItems: 'center', 
      padding: esMovil ? '1rem 1rem' : '1.2rem 3rem', // Menos espacio interno en celus
      backgroundColor: '#050505', 
      borderBottom: '1px solid #151515',
      boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
      gap: esMovil ? '12px' : '0'
    }}>
      {/* IZQUIERDA: Logo e Inicio */}
      <div style={{ display: 'flex', alignItems: 'center', gap: esMovil ? '1rem' : '3rem', width: esMovil ? '100%' : 'auto', justifyContent: esMovil ? 'space-between' : 'flex-start' }}>
        <Link to="/" style={{ color: '#fff', fontSize: esMovil ? '1.2rem' : '1.6rem', fontWeight: '900', textDecoration: 'none', letterSpacing: '1px' }}>
          ⚡ BCD TECH
        </Link>
        <div style={{ display: 'flex', gap: esMovil ? '1rem' : '2rem' }}>
          <Link to="/" style={linkStyle} onMouseOver={(e) => e.target.style.color = '#00f2fe'} onMouseOut={(e) => e.target.style.color = '#fff'}>Inicio</Link>
          <Link to="/contacto" style={linkStyle} onMouseOver={(e) => e.target.style.color = '#00f2fe'} onMouseOut={(e) => e.target.style.color = '#fff'}>Contacto</Link>
        </div>
      </div>

      {/* DERECHA: Login, Panel y Carrito */}
      <div style={{ display: 'flex', alignItems: 'center', gap: esMovil ? '1rem' : '2rem', width: esMovil ? '100%' : 'auto', justifyContent: esMovil ? 'flex-end' : 'flex-start' }}>
        
        {user && user.rol === 'admin' && (
          <Link to="/cargar-producto" style={{ ...linkStyle, color: '#00f2fe' }}>🛡️ Panel</Link>
        )}

        {user ? (
          <button onClick={cerrarSesion} style={{ background: 'transparent', border: 'none', color: '#ff4d4d', cursor: 'pointer', fontWeight: 'bold', fontSize: esMovil ? '0.85rem' : '1.1rem', outline: 'none' }}>
            Exit
          </button>
        ) : (
          <Link to="/login" style={{ ...linkStyle, color: '#aaaaaa' }} onMouseOver={(e) => e.target.style.color = '#fff'} onMouseOut={(e) => e.target.style.color = '#aaaaaa'}>
            👤 Login
          </Link>
        )}

        <Link to="/carrito" style={linkStyle} onMouseOver={(e) => e.target.style.color = '#00f2fe'} onMouseOut={(e) => e.target.style.color = '#fff'}>
          🛒 {esMovil ? '' : 'Carrito'} {/* En celu dejamos solo el emoji para ahorrar espacio */}
          {cantidadTotal() > 0 && (
            <span style={{ backgroundColor: '#00f2fe', color: '#000', borderRadius: '50%', padding: '2px 6px', fontSize: '0.75rem', fontWeight: 'bold', marginLeft: '4px', boxShadow: '0 0 8px #00f2fe' }}>
              {cantidadTotal()}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
};

export default Nav;

