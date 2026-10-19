import React from 'react';
import Header from './Header';
import Footer from './Footer';
import styles from './Layout.module.css'; // Importación de tus estilos

export const Layout = ({ children }) => {
  return (
    <div className={styles.layoutContainer}>
      <Header />
      
      {/* El mainContent ahora permitirá que tus productos se expandan a lo ancho */}
      <main className={styles.mainContent}>
        {children}
      </main>
      
      <Footer />
    </div>
  );
};

export default Layout;
