// src/pages/Carrito.jsx
import { useCarrito } from '../context/CarritoContext';

const Carrito = () => {
  const { 
    carrito, 
    vaciarCarrito, 
    eliminarDelCarrito, 
    incrementarCantidad, 
    decrementarCantidad, 
    cobroTotal 
  } = useCarrito();

  // Si el cliente no agregó nada aún, mostramos una pantalla limpia con estética gamer
  if (carrito.length === 0) {
    return (
      <div style={{ textAlign: 'center', marginTop: '80px', color: '#ccc' }}>
        <h1 style={{ color: '#00f2fe' }}>El carrito está vacío</h1>
        <p>Agrega componentes o periféricos para continuar con tu orden.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto', color: '#fff' }}>
      <h1 style={{ color: '#00f2fe', borderBottom: '2px solid #333', paddingBottom: '10px' }}>
        Carrito de Compras
      </h1>
      
      {/* Contenedor de la lista de productos seleccionados */}
      <div style={{ marginTop: '20px' }}>
        {carrito.map(item => (
          <div 
            key={item.id} 
            className="carrito-item" 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '1.5rem', 
              marginBottom: '1rem',
              backgroundColor: '#1a1a1a', // Fondo oscuro para combinar con tu app
              padding: '1rem',
              borderRadius: '8px',
              border: '1px solid #333'
            }}
          >
            {/* Maneja la compatibilidad si la imagen viene de tu json o de una api externa */}
            <img 
              src={item.imagen || item.image} 
              alt={item.nombre} 
              width="70" 
              height="70"
              style={{ objectFit: 'cover', borderRadius: '4px' }} 
            />
            
            <div style={{ flexGrow: 1 }}>
              <h4 style={{ margin: '0 0 5px 0', fontSize: '1.1rem' }}>{item.nombre}</h4>
              <p style={{ margin: '0', color: '#aaa', fontSize: '0.9rem' }}>
                Precio unitario: ${item.precio.toLocaleString('es-AR')}
              </p>
              <p style={{ margin: '5px 0 0 0', color: '#00f2fe', fontWeight: 'bold' }}>
                Subtotal: ${(item.precio * item.cantidad).toLocaleString('es-AR')}
              </p>
            </div>

            {/* Controles de cantidad (+ / -) */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
              <button 
                onClick={() => decrementarCantidad(item.id)}
                style={{ width: '30px', height: '30px', cursor: 'pointer', backgroundColor: '#333', color: '#fff', border: 'none', borderRadius: '4px' }}
              >
                -
              </button>
              <span style={{ minWidth: '20px', textAlign: 'center', fontWeight: 'bold' }}>
                {item.cantidad}
              </span>
              <button 
                onClick={() => incrementarCantidad(item.id)}
                style={{ width: '30px', height: '30px', cursor: 'pointer', backgroundColor: '#333', color: '#fff', border: 'none', borderRadius: '4px' }}
              >
                +
              </button>
            </div>

            {/* Botón con icono de papelera */}
            <button 
              onClick={() => eliminarDelCarrito(item.id)}
              title="Eliminar producto"
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: '#ff4d4d',
                padding: '0.5rem',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <svg 
                xmlns="http://w3.org" 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                <line x1="10" y1="11" x2="10" y2="17"></line>
                <line x1="14" y1="11" x2="14" y2="17"></line>
              </svg>
            </button>
          </div>
        ))}
      </div>

      {/* Resumen del Checkout al final de la página */}
      <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#111', padding: '1.5rem', borderRadius: '8px', border: '1px solid #222' }}>
        <h3 style={{ margin: '0' }}>
          Total a pagar:{' '}
          <span style={{ color: '#00f2fe' }}>
            ${cobroTotal().toLocaleString('es-AR')}
          </span>
        </h3>
        
        <div style={{ display: 'flex', gap: '15px' }}>
          <button 
            onClick={vaciarCarrito}
            style={{ padding: '10px 20px', cursor: 'pointer', backgroundColor: 'transparent', color: '#ff4d4d', border: '1px solid #ff4d4d', borderRadius: '4px', fontWeight: 'bold' }}
          >
            Vaciar Carrito
          </button>
          
          <button 
            onClick={() => alert("¡Próximamente procesamiento de órdenes con Firebase!")}
            style={{ padding: '10px 20px', cursor: 'pointer', backgroundColor: '#00f2fe', color: '#000', border: 'none', borderRadius: '4px', fontWeight: 'bold' }}
          >
            Finalizar Compra
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carrito;
