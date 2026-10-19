import { useState } from 'react';
import styles from './BotonFavorito.module.css';

export const BotonFavorito = () => {
  const [esFavorito, setEsFavorito] = useState(false);

  const toggleFavorito = () => {
    setEsFavorito(!esFavorito);
  };

  return (
    <button 
      onClick={toggleFavorito} 
      className={`${styles.botonFav} ${esFavorito ? styles.activo : ''}`}
    >
      {esFavorito ? '❤️ En Favoritos' : '🤍 Agregar a Favoritos'}
    </button>
  );
};

export default BotonFavorito;