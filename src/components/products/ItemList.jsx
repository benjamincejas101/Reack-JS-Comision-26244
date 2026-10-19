import React from 'react';
import Item from './Item';
import styles from './Item.module.css'; // Importamos los estilos

export const ItemList = ({ productos = [] }) => { // 
  return (
    <div className={styles.productsGrid}>
      {productos.map(product => (
        <Item key={product.id} {...product} />
      ))}
    </div>
  );
};

export default ItemList;

