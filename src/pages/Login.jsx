// src/pages/Login.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

export const Login = () => {
  const [esRegistro, setEsRegistro] = useState(false);
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [contrasenia, setContrasenia] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [esMovil, setEsMovil] = useState(window.innerWidth < 768);

  const navigate = useNavigate();
  const { login, signup } = useAuth();

  useEffect(() => {
    const controlarAncho = () => setEsMovil(window.innerWidth < 768);
    window.addEventListener('resize', controlarAncho);
    return () => window.removeEventListener('resize', controlarAncho);
  }, []);

  const manejarSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setCargando(true);

    try {
      if (esRegistro) {
        const credenciales = await signup(email, contrasenia);
        const uid = credenciales.user.uid;

        await setDoc(doc(db, "usuarios", uid), {
          nombre: nombre.trim() || "Cliente",
          email: email,
          rol: "user"
        });

        alert(`¡Cuenta creada con éxito! Bienvenido a BCD TECH, ${nombre || "Cliente"}.`);
        navigate('/');
      } else {
        const credenciales = await login(email, contrasenia);
        const uid = credenciales.user.uid;

        const userDocRef = doc(db, "usuarios", uid);
        const userDocSnap = await getDoc(userDocRef);

        let nombreUsuario = "Usuario";
        let rolUsuario = "user";

        if (userDocSnap.exists()) {
          const datos = userDocSnap.data();
          if (datos.nombre) nombreUsuario = datos.nombre;
          if (datos.rol) rolUsuario = datos.rol;
        }

        alert(`¡Inicio de sesión exitoso! Bienvenido de vuelta, ${nombreUsuario}.`);

        if (rolUsuario === 'admin') {
          navigate('/cargar-producto');
        } else {
          navigate('/');
        }
      }
    } catch (error) {
      console.error("Error de autenticación:", error.code, error.message);

      if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        setError('Credenciales incorrectas. Verifica tu correo y contraseña.');
      } else if (error.code === 'auth/email-already-in-use') {
        setError('Este correo ya está registrado. Intenta iniciar sesión.');
      } else if (error.code === 'auth/weak-password') {
        setError('La contraseña debe tener al menos 6 caracteres.');
      } else if (error.code === 'auth/too-many-requests') {
        setError('Demasiados intentos fallidos. Cuenta bloqueada temporalmente.');
      } else {
        setError('Ocurrió un error: ' + error.message);
      }
    } finally {
      setCargando(false);
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 14px',
    backgroundColor: '#161616',
    border: '1px solid #2a2a2a',
    borderRadius: '8px',
    color: '#fff',
    fontSize: '0.95rem',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    boxSizing: 'border-box'
  };

  return (
    <section style={{
      minHeight: 'calc(100vh - 80px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: esMovil ? '20px 15px' : '40px 20px',
      background: 'radial-gradient(circle at top right, rgba(0, 242, 254, 0.08), transparent 40%), radial-gradient(circle at bottom left, rgba(0, 242, 254, 0.05), transparent 40%)'
    }}>
      
      {/* CONTENEDOR PRINCIPAL DIVIDIDO */}
      <div style={{
        display: 'flex',
        flexDirection: esMovil ? 'column' : 'row',
        width: '100%',
        maxWidth: '880px',
        backgroundColor: '#0d0d0d',
        border: '1px solid #1f1f1f',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8), 0 0 30px rgba(0, 242, 254, 0.05)'
      }}>

        {/* COLUMNA IZQUIERDA: PANEL VISUAL / BRANDING (Oculto en móviles) */}
        {!esMovil && (
          <div style={{
            flex: '1',
            padding: '45px 35px',
            background: 'linear-gradient(145deg, #07191a 0%, #050505 100%)',
            borderRight: '1px solid #1a1a1a',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{
                display: 'inline-block',
                padding: '6px 12px',
                backgroundColor: 'rgba(0, 242, 254, 0.1)',
                border: '1px solid rgba(0, 242, 254, 0.3)',
                borderRadius: '20px',
                color: '#00f2fe',
                fontSize: '0.75rem',
                fontWeight: 'bold',
                letterSpacing: '1px',
                marginBottom: '20px'
              }}>
                PLATAFORMA OFICIAL
              </div>

              <h1 style={{ color: '#fff', fontSize: '2.1rem', fontWeight: '900', margin: '0 0 15px 0', lineHeight: '1.2' }}>
                ⚡ BCD <span style={{ color: '#00f2fe' }}>TECH</span>
              </h1>

              <p style={{ color: '#999', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '30px' }}>
                Accede a tu cuenta para gestionar tus compras, guardar hardware en favoritos y aprovechar descuentos exclusivos.
              </p>

              {/* Lista de beneficios */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#ccc', fontSize: '0.9rem' }}>
                  <span style={{ color: '#00f2fe', fontSize: '1.1rem' }}>✓</span>
                  <span>Guarda tus productos favoritos</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#ccc', fontSize: '0.9rem' }}>
                  <span style={{ color: '#00f2fe', fontSize: '1.1rem' }}>✓</span>
                  <span>Cupones y ofertas personalizadas</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#ccc', fontSize: '0.9rem' }}>
                  <span style={{ color: '#00f2fe', fontSize: '1.1rem' }}>✓</span>
                  <span>Checkout rápido y seguro</span>
                </div>
              </div>
            </div>

            <div style={{ borderTop: '1px solid #1a2a2b', paddingTop: '20px', marginTop: '30px' }}>
              <p style={{ color: '#666', fontSize: '0.8rem', margin: 0 }}>
                🔒 Autenticación protegida mediante Firebase Security.
              </p>
            </div>
          </div>
        )}

        {/* COLUMNA DERECHA: FORMULARIO */}
        <div style={{
          flex: '1.1',
          padding: esMovil ? '30px 22px' : '45px 40px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          
          {/* PESTAÑAS SUPERIORES */}
          <div style={{
            display: 'flex',
            backgroundColor: '#161616',
            padding: '4px',
            borderRadius: '10px',
            marginBottom: '25px',
            border: '1px solid #222'
          }}>
            <button
              type="button"
              onClick={() => { setEsRegistro(false); setError(''); }}
              style={{
                flex: 1,
                padding: '10px',
                borderRadius: '7px',
                border: 'none',
                backgroundColor: !esRegistro ? '#00f2fe' : 'transparent',
                color: !esRegistro ? '#000' : '#888',
                fontWeight: '800',
                fontSize: '0.9rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              Iniciar Sesión
            </button>
            <button
              type="button"
              onClick={() => { setEsRegistro(true); setError(''); }}
              style={{
                flex: 1,
                padding: '10px',
                borderRadius: '7px',
                border: 'none',
                backgroundColor: esRegistro ? '#00f2fe' : 'transparent',
                color: esRegistro ? '#000' : '#888',
                fontWeight: '800',
                fontSize: '0.9rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              Crear Cuenta
            </button>
          </div>

          <h2 style={{ color: '#fff', fontSize: '1.4rem', margin: '0 0 8px 0', fontWeight: '800' }}>
            {esRegistro ? 'Únete a BCD TECH' : 'Bienvenido de vuelta'}
          </h2>
          <p style={{ color: '#888', fontSize: '0.88rem', margin: '0 0 22px 0' }}>
            {esRegistro
              ? 'Completa tus datos para crear tu perfil de cliente.'
              : 'Ingresa tu correo y contraseña para continuar.'}
          </p>

          <form onSubmit={manejarSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {esRegistro && (
              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.85rem', color: '#ccc', fontWeight: '600' }}>
                  Nombre Completo
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Juan Pérez"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  onFocus={(e) => e.target.style.borderColor = '#00f2fe'}
                  onBlur={(e) => e.target.style.borderColor = '#2a2a2a'}
                  style={inputStyle}
                />
              </div>
            )}

            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.85rem', color: '#ccc', fontWeight: '600' }}>
                Correo Electrónico
              </label>
              <input
                type="email"
                required
                placeholder="nombre@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={(e) => e.target.style.borderColor = '#00f2fe'}
                onBlur={(e) => e.target.style.borderColor = '#2a2a2a'}
                style={inputStyle}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.85rem', color: '#ccc', fontWeight: '600' }}>
                Contraseña
              </label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={contrasenia}
                onChange={(e) => setContrasenia(e.target.value)}
                onFocus={(e) => e.target.style.borderColor = '#00f2fe'}
                onBlur={(e) => e.target.style.borderColor = '#2a2a2a'}
                style={inputStyle}
              />
            </div>

            {error && (
              <div style={{
                padding: '10px 12px',
                backgroundColor: 'rgba(255, 77, 77, 0.1)',
                border: '1px solid rgba(255, 77, 77, 0.4)',
                borderRadius: '6px',
                color: '#ff6b6b',
                fontSize: '0.85rem',
                fontWeight: '600'
              }}>
                ⚠️ {error}
              </div>
            )}

            <button
              type="submit"
              disabled={cargando}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              style={{
                width: '100%',
                padding: '13px',
                backgroundColor: cargando ? '#444' : '#00f2fe',
                color: '#000',
                border: 'none',
                borderRadius: '8px',
                fontWeight: '900',
                fontSize: '0.95rem',
                letterSpacing: '0.5px',
                cursor: cargando ? 'not-allowed' : 'pointer',
                marginTop: '6px',
                transition: 'all 0.25s ease',
                boxShadow: isHovered && !cargando ? '0 0 25px rgba(0, 242, 254, 0.5)' : '0 4px 12px rgba(0, 242, 254, 0.15)'
              }}
            >
              {cargando
                ? (esRegistro ? 'Creando cuenta...' : 'Verificando...')
                : (esRegistro ? '🚀 Registrarme Ahora' : 'Ingresar a mi Cuenta')}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
export default Login;