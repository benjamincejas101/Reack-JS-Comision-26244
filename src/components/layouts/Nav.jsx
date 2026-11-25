// src/components/layouts/Nav.jsx
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCarrito } from '../../context/CarritoContext';
import { useAuth } from '../../context/AuthContext';

export const Nav = () => {
  const { cantidadTotal } = useCarrito();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [esMovil, setEsMovil] = useState(window.innerWidth < 768);
  const [menuAbierto, setMenuAbierto] = useState(false);

  useEffect(() => {
    const controlarAncho = () => {
      setEsMovil(window.innerWidth < 768);
    };
    window.addEventListener('resize', controlarAncho);
    return () => window.removeEventListener('resize', controlarAncho);
  }, []);

  const cerrarSesion = async () => {
    try {
      await logout();
      setMenuAbierto(false);
      alert('Sesión cerrada.');
      navigate('/');
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const cerrarMenu = () => setMenuAbierto(false);

  const dropdownItemStyle = {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '0.95rem',
    fontWeight: '700',
    padding: '0.75rem 1rem',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    transition: 'background 0.2s, color 0.2s'
  };

  const actionPillStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    height: '40px',
    padding: '0 14px',
    backgroundColor: '#111',
    border: '1px solid #222',
    borderRadius: '8px',
    color: '#fff',
    textDecoration: 'none',
    fontSize: esMovil ? '0.85rem' : '0.95rem',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  };

  return (
    <nav style={{
      position: 'relative',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: esMovil ? '0.9rem 1rem' : '1rem 3rem',
      backgroundColor: '#050505',
      borderBottom: '1px solid #161616',
      boxShadow: '0 4px 20px rgba(0,0,0,0.6)',
      zIndex: 1000
    }}>
      
      {/* IZQUIERDA: Botón Inicio */}
      <Link 
        to="/" 
        onClick={cerrarMenu} 
        style={{
          ...actionPillStyle,
          fontSize: esMovil ? '0.95rem' : '1.05rem',
          fontWeight: '800',
          letterSpacing: '0.5px'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.borderColor = '#00f2fe';
          e.currentTarget.style.color = '#00f2fe';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.borderColor = '#222';
          e.currentTarget.style.color = '#fff';
        }}
      >
        🏠 Inicio
      </Link>

      {/* DERECHA: Iniciar Sesión + Ícono Carrito + Botón Hamburguesa */}
      <div style={{ display: 'flex', alignItems: 'center', gap: esMovil ? '0.6rem' : '0.8rem' }}>
        
        {/* Iniciar Sesión / Salir */}
        {user ? (
          <button 
            onClick={cerrarSesion} 
            style={{ 
              ...actionPillStyle,
              color: '#ff5c5c',
              borderColor: 'rgba(255, 92, 92, 0.25)',
              backgroundColor: 'rgba(255, 92, 92, 0.05)'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 92, 92, 0.15)'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 92, 92, 0.05)'}
          >
            🚪 {esMovil ? 'Salir' : 'Cerrar Sesión'}
          </button>
        ) : (
          <Link 
            to="/login" 
            onClick={cerrarMenu} 
            style={actionPillStyle}
            onMouseOver={(e) => {
              e.currentTarget.style.borderColor = '#00f2fe';
              e.currentTarget.style.color = '#00f2fe';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.borderColor = '#222';
              e.currentTarget.style.color = '#fff';
            }}
          >
            👤 {esMovil ? 'Ingresar' : 'Iniciar Sesión'}
          </Link>
        )}

        {/* Carrito (Solo ícono + burbuja dinámica) */}
        <Link 
          to="/carrito" 
          onClick={cerrarMenu}
          title="Ver carrito"
          style={{
            ...actionPillStyle,
            position: 'relative',
            padding: '0 12px',
            fontSize: '1.15rem'
          }}
          onMouseOver={(e) => e.currentTarget.style.borderColor = '#00f2fe'}
          onMouseOut={(e) => e.currentTarget.style.borderColor = '#222'}
        >
          🛒
          {cantidadTotal() > 0 && (
            <span style={{ 
              position: 'absolute',
              top: '-6px',
              right: '-6px',
              backgroundColor: '#00f2fe', 
              color: '#000', 
              borderRadius: '50%', 
              minWidth: '20px',
              height: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.75rem', 
              fontWeight: '900', 
              boxShadow: '0 0 10px #00f2fe' 
            }}>
              {cantidadTotal()}
            </span>
          )}
        </Link>

        {/* Botón Hamburguesa */}
        <button
          onClick={() => setMenuAbierto(!menuAbierto)}
          aria-label="Menú de opciones"
          style={{
            ...actionPillStyle,
            borderColor: menuAbierto ? '#00f2fe' : '#222',
            color: menuAbierto ? '#00f2fe' : '#fff',
            fontSize: '1.2rem',
            padding: '0 12px'
          }}
        >
          {menuAbierto ? '✕' : '☰'}
        </button>
      </div>

      {/* PANEL DESPLEGABLE */}
      {menuAbierto && (
        <div style={{
          position: 'absolute',
          top: '100%',
          right: esMovil ? '0' : '3rem',
          width: esMovil ? '100%' : '250px',
          backgroundColor: '#0a0a0a',
          border: '1px solid #1f1f1f',
          borderTop: esMovil ? '1px solid #1f1f1f' : 'none',
          borderRadius: '0 0 12px 12px',
          boxShadow: '0 12px 30px rgba(0, 0, 0, 0.9)',
          padding: '0.8rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.35rem',
          zIndex: 1001
        }}>
          <Link 
            to="/contacto" 
            onClick={cerrarMenu} 
            style={dropdownItemStyle}
            onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#151515'; e.currentTarget.style.color = '#00f2fe'; }}
            onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#fff'; }}
          >
            ✉️ Contacto
          </Link>

          <Link 
            to="/favoritos" 
            onClick={cerrarMenu} 
            style={dropdownItemStyle}
            onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#151515'; e.currentTarget.style.color = '#00f2fe'; }}
            onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#fff'; }}
          >
            ❤️ Mis Favoritos
          </Link>

          <Link 
            to="/ofertas" 
            onClick={cerrarMenu} 
            style={dropdownItemStyle}
            onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#151515'; e.currentTarget.style.color = '#00f2fe'; }}
            onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#fff'; }}
          >
            🔥 Ofertas y Cupones
          </Link>

          {user && user.rol === 'admin' && (
            <>
              <hr style={{ border: 'none', borderTop: '1px solid #1f1f1f', margin: '0.3rem 0' }} />
              <Link 
                to="/cargar-producto" 
                onClick={cerrarMenu} 
                style={{ ...dropdownItemStyle, color: '#00f2fe' }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#151515'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                🛡️ Panel Admin
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Nav;
