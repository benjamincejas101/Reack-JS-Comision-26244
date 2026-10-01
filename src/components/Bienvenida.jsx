export const Bienvenida = ({ nombreUsuario }) => {
  return (
    <div>
      <p>
        ¡Bienvenido a BDC TECH{nombreUsuario ? `, ${nombreUsuario}` : ''}!
      </p>
      <p>Explorá nuestro catálogo de tecnología y periféricos de alto rendimiento.</p>
    </div>
  );
};

export default Bienvenida;