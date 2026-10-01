import React from 'react';
import Nav from './Nav';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div>
        <h1>BDC TECH</h1>
        <p>Innovación y Tecnología</p>
      </div>
      <Nav />
    </header>
);
};

export default Header;