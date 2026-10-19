// src/pages/Panel.jsx
import { FormProductosContainer } from '../components/products/FormProductosContainer';

export const Panel = () => {
  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '40px auto', color: '#fff' }}>
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ color: '#00f2fe', fontSize: '2.2rem', marginBottom: '10px', letterSpacing: '1px' }}>
          Panel de Control Administrativo
        </h1>
        <p style={{ color: '#aaa', fontSize: '1.1rem' }}>
          Ingresa las especificaciones del nuevo hardware o periférico para darlo de alta en Firebase.
        </p>
        <div style={{ height: '2px', width: '100px', backgroundColor: '#00f2fe', margin: '20px auto 0 auto', boxShadow: '0 0 8px #00f2fe' }}></div>
      </header>

      {/* Contenedor estético oscuro para encuadrar tu formulario */}
      <div style={{ 
        backgroundColor: '#111', 
        padding: '30px', 
        borderRadius: '12px', 
        border: '1px solid #222',
        boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
      }}>
        {/* Aquí renderizamos tu lógica existente del formulario con ImgBB */}
        <FormProductosContainer />
      </div>
    </div>
  );
};

// Exportación por defecto obligatoria para que App.jsx lo importe sin llaves
export default Panel;

