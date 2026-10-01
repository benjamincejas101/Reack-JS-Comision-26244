import React from 'react';
import styles from './Nav.module.css';

const Nav = () => {
  return (
    <nav className={styles.nav}>
      <a href="#inicio">Inicio</a>
      <a href="#productos">Productos</a>
      <a href="#asistentes">Asistentes</a>
      <a href="#contacto">Contacto</a>
    </nav>
  );
};

export default Nav;