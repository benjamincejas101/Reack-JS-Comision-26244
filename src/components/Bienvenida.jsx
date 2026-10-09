import { Link } from 'react-router-dom';
import styles from './Bienvenida.module.css';

export const Bienvenida = () => {
  const productosDestacados = [
    {
      id: 1,
      nombre: "Teclado Mecánico Gamer RGB",
      precio: 45999,
      imagen: "https://i.ibb.co/BHY58WfV/teclado.jpg"
    },
    {
      id: 4,
      nombre: "Monitor 24\" IPS 144Hz",
      precio: 215000,
      imagen: "https://i.ibb.co/7NjcdPSk/monitor.jpg"
    },
    {
      id: 5,
      nombre: "Placa de Video NVIDIA RTX 3060",
      precio: 450000,
      imagen: "https://i.ibb.co/Kcwkczh3/placa.jpg"
    },
    {
      id: 15,
      nombre: "Notebook Gamer 15.6\" i5 RTX 4050",
      precio: 1250000,
      imagen: "https://i.ibb.co/spLLcZtK/notebook.jpg"
    }
  ];

  return (
    <div className={styles.container}>
      {/* Banner Principal de Bienvenida */}
      <div className={styles.hero}>
        <h1 className={styles.heroTitle}>⚡ Bienvenido a BDC TECH</h1>
        <p className={styles.heroText}>Tu tienda de confianza en componentes, hardware y periféricos de alto rendimiento.</p>
        <Link to="/productos" className={styles.btnCatalogo}>
          Ver Catálogo Completo
        </Link>
      </div>

      {/* Sección de Vista Previa de Productos Destacados */}
      <h3 className={styles.sectionTitle}>🔥 Productos Destacados</h3>
      
      <div className={styles.grid}>
        {productosDestacados.map((prod) => (
          <div key={prod.id} className={styles.card}>
            <div>
              <img src={prod.imagen} alt={prod.nombre} className={styles.cardImg} />
              <h4 className={styles.cardTitle}>{prod.nombre}</h4>
              <p className={styles.cardPrice}>${prod.precio.toLocaleString()}</p>
            </div>
            <Link to="/productos" className={styles.btnTienda}>
              Ver en Tienda
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bienvenida;