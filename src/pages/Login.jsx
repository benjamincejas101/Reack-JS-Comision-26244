// src/pages/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const [usuario, setUsuario] = useState('');
  const [contrasenia, setContrasenia] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const manejarLogin = (e) => {
    e.preventDefault();

    // Credenciales maestras del administrador
    if (usuario === 'admin' && contrasenia === 'gamer2026') {
      localStorage.setItem('isAdmin', 'true'); // Activa la llave de seguridad
      setError('');
      alert('¡Acceso concedido, Administrador!');
      navigate('/cargar-producto'); // Redirige automáticamente al Panel
      window.location.reload(); // Recarga para actualizar las pestañas del Nav
    } else {
      setError('Credenciales incorrectas. Acceso denegado.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '80px auto', padding: '30px', backgroundColor: '#111', border: '1px solid #222', borderRadius: '12px', color: '#fff', boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>
      <h2 style={{ textAlign: 'center', color: '#00f2fe', marginBottom: '20px' }}>🔒 Acceso Administrativo</h2>
      <p style={{ color: '#aaa', fontSize: '0.9rem', textAlign: 'center', marginBottom: '20px' }}>
        Ingresa tus credenciales para desbloquear las herramientas de inventario.
      </p>

      <form onSubmit={manejarLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem' }}>Usuario:</label>
          <input 
            type="text" 
            required
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            style={{ width: '100%', padding: '10px', backgroundColor: '#222', border: '1px solid #333', borderRadius: '4px', color: '#fff' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem' }}>Contraseña:</label>
          <input 
            type="password" 
            required
            value={contrasenia}
            onChange={(e) => setContrasenia(e.target.value)}
            style={{ width: '100%', padding: '10px', backgroundColor: '#222', border: '1px solid #333', borderRadius: '4px', color: '#fff' }}
          />
        </div>

        {error && <p style={{ color: '#ff4d4d', fontSize: '0.85rem', margin: '5px 0 0 0', fontWeight: 'bold' }}>{error}</p>}

        <button type="submit" style={{ width: '100%', padding: '12px', backgroundColor: '#00f2fe', color: '#000', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px', boxShadow: '0 0 10px rgba(0, 242, 254, 0.2)' }}>
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
};

// EXPORTACIÓN POR DEFECTO OBLIGATORIA PARA COMPATIBILIDAD CON TU APP.JSX
export default Login;
