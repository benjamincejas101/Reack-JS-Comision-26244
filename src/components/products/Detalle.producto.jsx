import { useEffect, useState } from 'react';

export const DetalleProducto = ({ itemId = '1' }) => {
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/datos/productos.json')
      .then((response) => response.json())
      .then((data) => {
        const encontrado = data.find((prod) => prod.id == itemId);
        setProducto(encontrado);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error al cargar el detalle:', error);
        setLoading(false);
      });
  }, [itemId]);

  if (loading) {
    return <p>Cargando detalle del producto...</p>;
  }

  if (!producto) {
    return <p>El producto no fue encontrado.</p>;
  }

  return (
    <article className="detalle-producto">
      <p>{producto.categoria}</p>
      <h2>{producto.nombre}</h2>
      <p>{producto.descripcion}</p>
      <p>$ {producto.precio.toLocaleString()}</p>
      <p>Stock disponible: {producto.stock} unidades</p>
    </article>
  );
};

export default DetalleProducto;