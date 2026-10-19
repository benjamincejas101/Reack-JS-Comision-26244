// src/components/layouts/Nav.jsx
import { Link, useNavigate } from 'react-router-dom';
import { useCarrito } from '../../context/CarritoContext';

export const Nav = () => {
  const { cantidadTotal } = useCarrito();
  const navigate = useNavigate();
  const esAdmin = localStorage.getItem('isAdmin') === 'true';

  const cerrarSesion = () => {
    localStorage.removeItem('isAdmin');
    alert('Sesión cerrada.');
    navigate('/');
    window.location.reload();
  };

  // Objeto de estilo base para los enlaces del menú
  const linkStyle = {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '1.1rem', // Aumentamos el tamaño
    fontWeight: '800',   // Letras bien gruesas/negritas
    letterSpacing: '0.5px',
    transition: 'all 0.2s ease-in-out'
  };

  return (
    <nav style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      padding: '1.2rem 3rem', // Más espacio interno
      backgroundColor: '#050505', // Negro más profundo
      borderBottom: '1px solid #151515',
      boxShadow: '0 4px 15px rgba(0,0,0,0.5)'
    }}>
      {/* IZQUIERDA: Logo e Inicio */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '3rem' }}>
        <Link to="/" style={{ color: '#fff', fontSize: '1.6rem', fontWeight: '900', textDecoration: 'none', letterSpacing: '1px' }}>
          ⚡ BCD TECH
        </Link>
        <div style={{ display: 'flex', gap: '2rem' }}>
          <Link to="/" style={linkStyle} onMouseOver={(e) => e.target.style.color = '#00f2fe'} onMouseOut={(e) => e.target.style.color = '#fff'}>Inicio</Link>
          <Link to="/contacto" style={linkStyle} onMouseOver={(e) => e.target.style.color = '#00f2fe'} onMouseOut={(e) => e.target.style.color = '#fff'}>Contacto</Link>
        </div>
      </div>

      {/* DERECHA: Login, Panel y Carrito */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        {esAdmin ? (
          <>
            <Link to="/cargar-producto" style={{ ...linkStyle, color: '#00f2fe' }}>🛡️ Panel</Link>
            <button onClick={cerrarSesion} style={{ background: 'transparent', border: 'none', color: '#ff4d4d', cursor: 'pointer', fontWeight: 'bold', fontSize: '1.1rem' }}>
              Exit
            </button>
          </>
        ) : (
          <Link to="/login" style={{ ...linkStyle, color: '#aaaaaa' }} onMouseOver={(e) => e.target.style.color = '#fff'} onMouseOut={(e) => e.target.style.color = '#aaaaaa'}>
            👤 Login
          </Link>
        )}

        <Link to="/carrito" style={linkStyle} onMouseOver={(e) => e.target.style.color = '#00f2fe'} onMouseOut={(e) => e.target.style.color = '#fff'}>
          🛒 Carrito
          {cantidadTotal() > 0 && (
            <span style={{ backgroundColor: '#00f2fe', color: '#000', borderRadius: '50%', padding: '2px 8px', fontSize: '0.8rem', fontWeight: 'bold', marginLeft: '6px', boxShadow: '0 0 8px #00f2fe' }}>
              {cantidadTotal()}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
