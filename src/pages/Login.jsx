// src/pages/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { doc, getDoc } from 'firebase/firestore'; // 📦 Importamos herramientas de Firestore
import { db } from '../firebase/config';         // 📦 Importamos tu base de datos configurada

export const Login = () => {
  const [email, setEmail] = useState('');
  const [contrasenia, setContrasenia] = useState('');
  const [error, setError] = useState('');
  const [iniciando, setIniciando] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  
  const { login } = useAuth();

  const manejarLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIniciando(true);

    try {
      // 1. Iniciamos sesión en Firebase Authentication
      const credenciales = await login(email, contrasenia);
      const uid = credenciales.user.uid;

      // 2. Buscamos inmediatamente tu documento en Firestore para extraer tu nombre
      const userDocRef = doc(db, "usuarios", uid);
      const userDocSnap = await getDoc(userDocRef);
      
      let nombreUsuario = "Administrador"; 
      if (userDocSnap.exists() && userDocSnap.data().nombre) {
        nombreUsuario = userDocSnap.data().nombre; // 👈 Captura tu nombre personalizado
      }
      
      // 3. Te saludamos de manera personalizada usando tu nombre real
      alert(`¡Inicio de sesión exitoso! Bienvenido de vuelta, ${nombreUsuario}.`);
      
      navigate('/cargar-producto'); 
    } catch (error) {
      console.error("Error en el login:", error.code, error.message);
      
      if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        setError('Credenciales incorrectas. Acceso denegado.');
      } else if (error.code === 'auth/too-many-requests') {
        setError('Demasiados intentos fallidos. Cuenta bloqueada temporalmente.');
      } else {
        setError('Ocurrió un error: ' + error.message);
      }
    } finally {
      setIniciando(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '80px auto', padding: '30px', backgroundColor: '#111', border: '1px solid #222', borderRadius: '12px', color: '#fff', boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>
      <h2 style={{ textAlign: 'center', color: '#00f2fe', marginBottom: '20px' }}>🔒 Acceso Administrativo</h2>
      
      <p style={{ color: '#aaa', fontSize: '0.9rem', textAlign: 'center', marginBottom: '20px' }}>
        Ingresa tus credenciales de Firebase para desbloquear las herramientas de inventario.
      </p>
      
      <form onSubmit={manejarLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem' }}>Correo Electrónico:</label>
          <input 
            type="email" 
            required 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            style={{ width: '100%', padding: '10px', backgroundColor: '#222', border: '1px solid #333', borderRadius: '4px', color: '#fff', outline: 'none' }} 
          />
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem' }}>Contraseña:</label>
          <input 
            type="password" 
            required 
            value={contrasenia} 
            onChange={(e) => setContrasenia(e.target.value)} 
            style={{ width: '100%', padding: '10px', backgroundColor: '#222', border: '1px solid #333', borderRadius: '4px', color: '#fff', outline: 'none' }} 
          />
        </div>
        
        {error && <p style={{ color: '#ff4d4d', fontSize: '0.85rem', margin: '5px 0 0 0', fontWeight: 'bold' }}>{error}</p>}
        
        <button 
          type="submit" 
          disabled={iniciando}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{ 
            width: '100%', 
            padding: '12px', 
            backgroundColor: iniciando ? '#555' : '#00f2fe', 
            color: '#000', 
            border: 'none', 
            borderRadius: '4px', 
            fontWeight: 'bold', 
            cursor: iniciando ? 'not-allowed' : 'pointer', 
            marginTop: '10px', 
            transition: 'all 0.3s ease',
            boxShadow: isHovered && !iniciando ? '0 0 20px rgba(0, 242, 254, 0.6)' : '0 0 10px rgba(0, 242, 254, 0.2)' 
          }}
        >
          {iniciando ? 'Ingresando...' : 'Iniciar Sesión'}
        </button>
      </form>
    </div>
  );
};

export default Login;
