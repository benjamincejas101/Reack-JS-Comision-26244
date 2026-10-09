import { Link } from 'react-router-dom';

export const Bienvenida = () => {
  // Productos destacados para la vista previa del Home
  const productosDestacados = [
    {
      id: 1,
      nombre: "Teclado Mecánico Gamer RGB",
      precio: 45999,
      imagen: "https://i.ibb.co/BHY58WfV/teclado.jpg"
    },
    {
      id: 4,
      nombre: "Monitor 24\" IPS 144Hz",
      precio: 215000,
      imagen: "https://i.ibb.co/7NjcdPSk/monitor.jpg"
    },
    {
      id: 5,
      nombre: "Placa de Video NVIDIA RTX 3060",
      precio: 450000,
      imagen: "https://i.ibb.co/Kcwkczh3/placa.jpg"
    },
    {
      id: 15,
      nombre: "Notebook Gamer 15.6\" i5 RTX 4050",
      precio: 1250000,
      imagen: "https://i.ibb.co/spLLcZtK/notebook.jpg"
    }
  ];

  return (
    <div style={{ padding: '20px 0', color: '#fff' }}>
      {/* Banner Principal de Bienvenida */}
      <div style={{ padding: '40px 20px', background: 'linear-gradient(135deg, #161b22, #1f242c)', borderRadius: '12px', textAlign: 'center', marginBottom: '40px', border: '1px solid #30363d' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '15px', color: '#58a6ff' }}>⚡ Bienvenido a BDC TECH</h1>
        <p style={{ color: '#8b949e', fontSize: '1.1rem', marginBottom: '25px' }}>Tu tienda de confianza en componentes, hardware y periféricos de alto rendimiento.</p>
        <Link 
          to="/productos" 
          style={{ padding: '12px 25px', background: '#238636', color: '#fff', borderRadius: '6px', textDecoration: 'none', fontWeight: 'bold', transition: 'background 0.2s' }}
        >
          Ver Catálogo Completo
        </Link>
      </div>

      {/* Sección de Vista Previa de Productos Destacados */}
      <h3 style={{ marginBottom: '20px', fontSize: '1.5rem', borderBottom: '1px solid #30363d', paddingBottom: '10px' }}>🔥 Productos Destacados</h3>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
        {productosDestacados.map((prod) => (
          <div key={prod.id} style={{ background: '#161b22', border: '1px solid #30363d', borderRadius: '8px', padding: '15px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <img 
                src={prod.imagen} 
                alt={prod.nombre} 
                style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '6px', marginBottom: '12px' }} 
              />
              <h4 style={{ fontSize: '1rem', marginBottom: '8px', color: '#e1e1e6' }}>{prod.nombre}</h4>
              <p style={{ color: '#58a6ff', fontWeight: 'bold', fontSize: '1.1rem' }}>${prod.precio.toLocaleString()}</p>
            </div>
            <Link 
              to="/productos" 
              style={{ marginTop: '15px', display: 'block', textAlign: 'center', padding: '8px', background: '#21262d', color: '#58a6ff', borderRadius: '4px', textDecoration: 'none', border: '1px solid #30363d', fontSize: '0.9rem' }}
            >
              Ver en Tienda
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bienvenida;