import { useEffect, useState } from 'react';
import { ItemList } from './ItemList';

export const ItemListContainer = ({ greeting }) => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/datos/productos.json').then((res) => res.json()),
      fetch('https://fakestoreapi.com/products').then((res) => res.json()),
    ])
      .then(([locales, externos]) => {
        // Normalizamos los productos de la API para que coincidan con tu estructura local
        const externosNormalizados = externos.map((prod) => ({
          id: prod.id + 100, // Evitamos que se repitan los IDs con los locales
          nombre: prod.title,
          precio: prod.price,
          stock: 15, // Stock simulado ya que la API no trae
          categoria: prod.category,
          descripcion: prod.description,
          imagen: prod.image
        }));

        // Unimos los locales con los externos ya normalizados
        const combinados = [...locales, ...externosNormalizados];
        setProductos(combinados);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error al cargar datos combinados:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h2>{greeting}</h2>
      {loading ? (
        <p>Cargando productos...</p>
      ) : (
        <ItemList productos={productos} />
      )}
    </div>
  );
};

export default ItemListContainer;