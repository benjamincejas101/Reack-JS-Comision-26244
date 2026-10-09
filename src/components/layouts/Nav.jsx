import { Link } from 'react-router-dom';
import styles from './Nav.module.css';

export const Nav = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link to="/">⚡ BDC TECH</Link>
      </div>
      <ul className={styles.navLinks}>
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/productos">Productos</Link></li>
        <li><Link to="/cargar-producto">Cargar Producto</Link></li>
        <li><Link to="/contacto">Contacto</Link></li>
      </ul>
    </nav>
  );
};

export default Nav;