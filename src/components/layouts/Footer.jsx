import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <p>BDC TECH</p>
        <p>Innovación y Tecnología</p>
      </div>
    </footer>
  );
};

export default Footer;