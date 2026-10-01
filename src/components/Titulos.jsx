import styles from './Titulos.module.css';

export const Titulos = ({ titulo, subtitulo }) => {
  return (
    <div className={styles.contenedorTitulo}>
      <h1 className={styles.tituloPrincipal}>{titulo}</h1>
      {subtitulo && <p className={styles.subtitulo}>{subtitulo}</p>}
    </div>
  );
};

export default Titulos;