// src/components/Cupon.jsx
import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config'; 
import estilos from './Cupon.module.css'; 

const Cupon = () => {
  const [cupones, setCupones] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCupones = async () => {
      try {
        setCargando(true);
        setError('');
        
        console.log("Intentando conectar a Firestore con la colección 'cupones'...");
        const querySnapshot = await getDocs(collection(db, 'cupones'));
        
        console.log("¿La colección está vacía?", querySnapshot.empty);
        
        const docs = querySnapshot.docs.map(docSnap => {
          console.log("Documento crudo encontrado:", docSnap.id, docSnap.data());
          return {
            id: docSnap.id,
            ...docSnap.data(),
          };
        });
        
        setCupones(docs);
      } catch (err) {
        console.error('Error capturado al obtener cupones:', err);
        setError(`Error de conexión: ${err.message || err.toString()}`);
      } finally {
        setCargando(false);
      }
    };

    fetchCupones();
  }, []);

  return (
    <div className="page-container" style={{ color: '#fff', padding: '20px' }}>
      <section className={estilos.container}>
        <header className={estilos.header}>
          <h1>Cupones Promocionales</h1>
        </header>

        {/* 🚨 RECUADRO DE DIAGNÓSTICO EN TIEMPO REAL 🚨 */}
        <div style={{ background: '#222', border: '1px dashed #00f2fe', padding: '15px', borderRadius: '8px', margin: '20px 0', fontFamily: 'monospace' }}>
          <h3 style={{ color: '#00f2fe', margin: '0 0 10px 0' }}>🔍 Estado del Sistema:</h3>
          <p>• <strong>Cargando:</strong> {cargando ? "SÍ ⏳" : "NO ✅"}</p>
          <p>• <strong>Error actual:</strong> {error ? <span style={{ color: '#ff4d4d' }}>{error}</span> : "Ninguno u"}</p>
          <p>• <strong>Cantidad de cupones en memoria:</strong> {cupones.length}</p>
          <p>• <strong>Datos crudos devueltos:</strong> {JSON.stringify(cupones)}</p>
        </div>

        {/* Renderizado original */}
        {cupones.length > 0 && (
          <section className={estilos.listSection}>
            <div className={estilos.listHeader}>
              <h2 className={estilos.sectionTitle}>Cupones activos</h2>
              <span className={estilos.badge}>{cupones.length}</span>
            </div>

            <div className={estilos.grid}>
              {cupones.map(cupon => (
                <article key={cupon.id} className={estilos.card}>
                  <div className={estilos.cardContent}>
                    <span className={estilos.code}>{cupon.codigo || "SIN_CODIGO_PROP"}</span>
                    <span className={estilos.discount}>-{cupon.descuento || 0}%</span>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </section>
    </div>
  );
};

export default Cupon;


