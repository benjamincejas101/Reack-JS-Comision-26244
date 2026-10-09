import styles from './Item.module.css';

export const Item = ({ producto }) => {
  return (
    <div className={styles.card}>
      <div className={styles.imagenContainer}>
        <img src={producto.imagen} alt={producto.nombre} />
      </div>
      
      <div className={styles.contenido}>
        <span className={styles.categoria}>{producto.categoria}</span>
        <h4 className={styles.titulo}>{producto.nombre}</h4>
        
        {/* Aquí forzamos a que se imprima la descripción tal cual viene del JSON */}
        <p className={styles.descripcion}>{producto.descripcion}</p>
        
        <p className={styles.precio}>${producto.precio.toLocaleString()}</p>
      </div>
    </div>
  );
};

export default Item;