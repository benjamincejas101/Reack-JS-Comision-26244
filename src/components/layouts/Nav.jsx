import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Nav.module.css';

export const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Detectar cambios de tamaño de pantalla para saber si estamos en celular
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link to="/">⚡ BDC TECH</Link>
      </div>

      {/* Botón Hamburguesa (solo visible en mobile por CSS) */}
      <button className={styles.hamburger} onClick={toggleMenu} aria-label="Abrir menú">
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* En PC se muestra siempre. En celular, SI menuOpen es false, REACT NO LO RENDERIZA */}
      {(!isMobile || menuOpen) && (
        <ul className={`${styles.navLinks} ${isMobile && menuOpen ? styles.openMobile : ''}`}>
          <li><Link to="/" onClick={() => setMenuOpen(false)}>Inicio</Link></li>
          <li><Link to="/productos" onClick={() => setMenuOpen(false)}>Productos</Link></li>
          <li><Link to="/cargar-producto" onClick={() => setMenuOpen(false)}>Cargar Producto</Link></li>
          <li><Link to="/contacto" onClick={() => setMenuOpen(false)}>Contacto</Link></li>
        </ul>
      )}
    </nav>
  );
};

export default Nav;