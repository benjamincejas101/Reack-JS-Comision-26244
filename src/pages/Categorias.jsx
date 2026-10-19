// src/pages/Categorias.jsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase/config';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { ItemList } from '../components/products/ItemList'; 

export const Categorias = () => {
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Obtenemos el parámetro 'idCategoria' definido en las rutas de App.jsx
  const { idCategoria } = useParams();

  useEffect(() => {
    const obtenerProductosPorCategoria = async () => {
      setLoading(true);
      try {
        const productosRef = collection(db, 'productos');
        
        // Creamos una consulta filtrando por el campo 'categoria' de tus documentos
        const q = query(productosRef, where('categoria', '==', idCategoria));
        const querySnapshot = await getDocs(q);
        
        const docs = querySnapshot.docs.map(docSnap => ({
          id: docSnap.id,
          ...docSnap.data()
        }));

        setProductosFiltrados(docs);
      } catch (error) {
        console.error("Error al filtrar categorías:", error);
      } finally {
        setLoading(false);
      }
    };

    if (idCategoria) {
      obtenerProductosPorCategoria();
    }
  }, [idCategoria]);

  if (loading) {
    return <div className="loading-screen"><div className="spinner"></div><p>Filtrando catálogo...</p></div>;
  }

  return (
    <div className="catalog-container">
      <h2 style={{ textAlign: 'center', textTransform: 'capitalize', margin: '20px 0' }}>
        Categoría: {idCategoria}
      </h2>
      {productosFiltrados.length === 0 ? (
        <p style={{ textAlign: 'center' }}>No se encontraron productos en esta categoría.</p>
      ) : (
        <ItemList productos={productosFiltrados} />
      )}
    </div>
  );
};

export default Categorias;
