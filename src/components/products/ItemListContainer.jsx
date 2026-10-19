import { useEffect, useState } from 'react';
import { ItemList } from './ItemList';
import { db } from '../../firebase/config';
import { collection, getDocs } from 'firebase/firestore';

export const ItemListContainer = ({ greeting }) => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true); // Comienza en true

  useEffect(() => {
    const obtenerProductosFirebase = async () => {
      try {
        const productosRef = collection(db, 'productos');
        const querySnapshot = await getDocs(productosRef);
        
        const docsNormalizados = querySnapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data()
        }));

        setProductos(docsNormalizados);
      } catch (error) {
        console.error('Error al cargar datos desde Firebase:', error);
      } finally {
        // Apagamos el loading tanto si salió bien como si falló
        setLoading(false); 
      }
    };

    obtenerProductosFirebase();
  }, []);

  // RETORNO CONDICIONAL: Si está cargando, frena el código aquí y muestra la animación
  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Cargando el arsenal gamer...</p>
      </div>
    );
  }

  // Si loading es false, este es el código que finalmente se muestra
  return (
    <div className="catalog-container">
      <h2 style={{ textAlign: 'center', margin: '20px 0' }}>{greeting}</h2>
      <ItemList productos={productos} />
    </div>
  );
};

export default ItemListContainer;
