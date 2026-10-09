import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Nav.module.css';

export const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link to="/">⚡ BDC TECH</Link>
      </div>

      {/* Botón Hamburguesa para celulares */}
      <button className={styles.hamburger} onClick={toggleMenu} aria-label="Abrir menú">
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Lista de enlaces con clase dinámica si menuOpen es true */}
      <ul className={`${styles.navLinks} ${menuOpen ? styles.open : ''}`}>
        <li><Link to="/" onClick={() => setMenuOpen(false)}>Inicio</Link></li>
        <li><Link to="/productos" onClick={() => setMenuOpen(false)}>Productos</Link></li>
        <li><Link to="/cargar-producto" onClick={() => setMenuOpen(false)}>Cargar Producto</Link></li>
        <li><Link to="/contacto" onClick={() => setMenuOpen(false)}>Contacto</Link></li>
      </ul>
    </nav>
  );
};

export default Nav;