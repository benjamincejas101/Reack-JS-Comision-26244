export const Item = ({ producto }) => {
  return (
    <article className="product-item">
      {/* Renderizamos la imagen si el producto la tiene */}
      {producto.imagen && (
        <img src={producto.imagen} alt={producto.nombre} />
      )}

      <p>{producto.categoria}</p>
      <h3>{producto.nombre}</h3>
      <p>{producto.descripcion}</p>
      <p>{"$" + producto.precio.toLocaleString()}</p>
      <p>Stock disponible: {producto.stock} un.</p>
      <button>Ver Detalle</button>
    </article>
  );
};