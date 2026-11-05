// src/components/products/Item.jsx
import { useCarrito } from '../../context/CarritoContext';

// Volvemos a recibir 'producto' como estaba originalmente en tu base de datos
export const Item = ({ producto }) => {
  const { agregarAlCarrito } = useCarrito();

  const handleAgregar = () => {
    agregarAlCarrito(producto, 1);
    alert(`¡${producto?.nombre} agregado al carrito!`);
  };

  return (
    <div style={{ 
      backgroundColor: '#0c0c0c', 
      border: '1px solid #1a1a1a', 
      padding: '20px', 
      borderRadius: '8px', 
      color: '#fff', 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'space-between',
      minHeight: '520px',
      width: '100%',
      boxShadow: '0 4px 15px rgba(0,0,0,0.6)',
      boxSizing: 'border-box'
    }}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ 
          width: '100%', 
          height: '160px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          marginBottom: '12px',
          backgroundColor: '#111', 
          borderRadius: '4px'
        }}>
          <img 
            src={producto?.imagen} 
            alt={producto?.nombre} 
            style={{ maxWidth: '95%', maxHeight: '95%', objectFit: 'contain' }} 
          />
        </div>

        <h3 style={{ 
          fontSize: '1rem', 
          margin: '0 0 8px 0', 
          textAlign: 'center', 
          height: '42px', 
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          lineHeight: '1.3',
          fontWeight: 'bold'
        }}>
          {producto?.nombre}
        </h3>

        <p style={{
          fontSize: '0.85rem',
          color: '#888',
          margin: '0 0 15px 0',
          textAlign: 'center',
          height: '65px',
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          lineHeight: '1.4'
        }}>
          {producto?.descripcion}
        </p>
      </div>

      <p style={{ color: '#00f2fe', fontWeight: 'bold', fontSize: '1.4rem', margin: '10px 0' }}>
        ${producto?.precio?.toLocaleString('es-AR')}
      </p>
      <button 
        onClick={handleAgregar}
        style={{ 
          width: '100%', 
          padding: '12px', 
          backgroundColor: '#00f2fe', 
          color: '#000', 
          border: 'none', 
          borderRadius: '4px', 
          fontWeight: 'bold', 
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          fontSize: '0.95rem',
          transition: 'background-color 0.2s'
        }}
      >
        🛒 Agregar al Carrito
      </button>
    </div>
  );
};

export default Item;

