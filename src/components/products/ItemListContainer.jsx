import { useEffect, useState } from 'react';
import { db } from '../firebase/config';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { ItemList } from './ItemList'; // Asegúrate de tener este componente para renderizar el mapeo

export const ItemListContainer = () => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        setCargando(true);
        // 1. APUNTAMOS A LA COLECCIÓN "Productos" (con P mayúscula)
        const productosRef = collection(db, "Productos");
        
        // 2. ORDENAMOS POR FECHA DE REGISTRO PARA MOSTRAR LOS MÁS NUEVOS PRIMERO
        const q = query(productosRef, orderBy("fechaRegistro", "desc"));
        const querySnapshot = await getDocs(q);
        
        // 3. MAPEAMOS LOS DATOS DE FIREBASE AGREGANDO EL ID ÚNICO DE DOCUMENTO
        const docs = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setProductos(docs);
      } catch (error) {
        console.error("Error al traer los productos de Firebase:", error);
      } finally {
        setCargando(false);
      }
    };

    obtenerProductos();
  }, []);

  if (cargando) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px', color: '#00f2fe' }}>
        <h2>Cargando componentes de alta gama...</h2>
      </div>
    );
  }

  return (
    <div>
      {/* 4. RENDERIZAMOS TUS COMPONENTES SI HAY PRODUCTOS */}
      {productos.length > 0 ? (
        <ItemList productos={productos} />
      ) : (
        <h2 style={{ textAlign: 'center', marginTop: '50px', color: '#fff' }}>
          No hay artículos cargados en esta categoría actualmente.
        </h2>
      )}
    </div>
  );
};

export default ItemListContainer;

