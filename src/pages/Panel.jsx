import { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc 
} from 'firebase/firestore';

const Panel = () => {
  const [productos, setProductos] = useState([]);
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [categoria, setCategoria] = useState('Hardware');
  const [descripcion, setDescripcion] = useState('');
  const [imagen, setImagen] = useState('');
  const [idEditando, setIdEditando] = useState(null); // Controla si estamos creando o editando

  // 1. READ: Obtener productos de Firestore
  const obtenerProductos = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'Productos'));
      const docs = querySnapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      setProductos(docs);
    } catch (error) {
      console.error("Error al leer productos:", error);
    }
  };

  useEffect(() => {
    obtenerProductos();
  }, []);

  // 2. CREATE o UPDATE: Guardar o modificar en Firestore
  const manejarGuardar = async (e) => {
    e.preventDefault();
    const nuevoProducto = {
      nombre,
      precio: Number(precio),
      categoria,
      descripcion,
      imagen: imagen || 'https://placeholder.com'
    };

    try {
      if (idEditando) {
        // 📝 UPDATE (Modificar existente)
        const productoRef = doc(db, 'Productos', idEditando);
        await updateDoc(productoRef, nuevoProducto);
        alert('¡Producto actualizado con éxito!');
      } else {
        // ➕ CREATE (Agregar nuevo)
        await addDoc(collection(db, 'Productos'), nuevoProducto);
        alert('¡Producto creado con éxito!');
      }
      limpiarFormulario();
      obtenerProductos(); // Recarga la lista en tiempo real
    } catch (error) {
      console.error("Error al guardar producto:", error);
    }
  };

  // 3. DELETE: Eliminar producto de Firestore
  const manejarEliminar = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este producto de forma permanente?')) {
      try {
        await deleteDoc(doc(db, 'Productos', id));
        alert('Producto eliminado con éxito.');
        obtenerProductos();
      } catch (error) {
        console.error("Error al eliminar producto:", error);
      }
    }
  };

  // Función auxiliar para cargar los datos en el formulario al editar
  const iniciarEdicion = (prod) => {
    setIdEditando(prod.id);
    setNombre(prod.nombre);
    setPrecio(prod.precio);
    setCategoria(prod.categoria);
    setDescripcion(prod.descripcion);
    setImagen(prod.imagen);
  };

  const limpiarFormulario = () => {
    setIdEditando(null);
    setNombre('');
    setPrecio('');
    setCategoria('Hardware');
    setDescripcion('');
    setImagen('');
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1100px', margin: '0 auto', color: '#fff' }}>
      <h1 style={{ color: '#00f2fe', borderBottom: '2px solid #222', paddingBottom: '10px' }}>
        🛡️ Panel de Control - Inventario CRUD
      </h1>

      <div style={{ display: 'flex', gap: '40px', marginTop: '30px', flexWrap: 'wrap' }}>
        
        {/* FORMULARIO DE ACCIONES (CREATE / UPDATE) */}
        <form onSubmit={manejarGuardar} style={{ flex: '1', minWidth: '320px', backgroundColor: '#111', padding: '25px', borderRadius: '8px', border: '1px solid #222', height: 'fit-content' }}>
          <h3 style={{ color: '#00f2fe', margin: '0 0 20px 0' }}>
            {idEditando ? '📝 Editar Componente' : '➕ Cargar Nuevo Componente'}
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: '#aaa', marginBottom: '5px' }}>Nombre:</label>
              <input type="text" required value={nombre} onChange={e => setNombre(e.target.value)} style={{ width: '100%', padding: '10px', backgroundColor: '#222', border: '1px solid #333', borderRadius: '4px', color: '#fff', boxSizing: 'border-box' }} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: '#aaa', marginBottom: '5px' }}>Precio ($):</label>
              <input type="number" required value={precio} onChange={e => setPrecio(e.target.value)} style={{ width: '100%', padding: '10px', backgroundColor: '#222', border: '1px solid #333', borderRadius: '4px', color: '#fff', boxSizing: 'border-box' }} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: '#aaa', marginBottom: '5px' }}>Categoría:</label>
              <select value={categoria} onChange={e => setCategoria(e.target.value)} style={{ width: '100%', padding: '10px', backgroundColor: '#222', border: '1px solid #333', borderRadius: '4px', color: '#fff', boxSizing: 'border-box' }}>
                <option value="Hardware">Hardware</option>
                <option value="Periféricos">Periféricos</option>
                <option value="Audio">Audio</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: '#aaa', marginBottom: '5px' }}>URL de la Imagen:</label>
              <input type="text" value={imagen} onChange={e => setImagen(e.target.value)} placeholder="https://..." style={{ width: '100%', padding: '10px', backgroundColor: '#222', border: '1px solid #333', borderRadius: '4px', color: '#fff', boxSizing: 'border-box' }} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: '#aaa', marginBottom: '5px' }}>Descripción:</label>
              <textarea required rows="3" value={descripcion} onChange={e => setDescripcion(e.target.value)} style={{ width: '100%', padding: '10px', backgroundColor: '#222', border: '1px solid #333', borderRadius: '4px', color: '#fff', boxSizing: 'border-box', resize: 'none' }} />
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <button type="submit" style={{ flex: 1, padding: '12px', backgroundColor: '#00f2fe', color: '#000', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>
                {idEditando ? 'Actualizar' : 'Guardar Producto'}
              </button>
              {idEditando && (
                <button type="button" onClick={limpiarFormulario} style={{ padding: '12px', backgroundColor: '#333', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>
                  Cancelar
                </button>
              )}
            </div>
          </div>
        </form>

        {/* LISTADO DE CONTROL DE STOCKS (READ / DELETE) */}
        <div style={{ flex: '1.5', minWidth: '400px' }}>
          <h3 style={{ margin: '0 0 20px 0' }}>Lista de Stocks de la Tienda ({productos.length})</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '550px', overflowY: 'auto', paddingRight: '5px' }}>
            {productos.map(prod => (
              <div key={prod.id} style={{ display: 'flex', alignItems: 'center', gap: '15px', backgroundColor: '#1a1a1a', padding: '12px 20px', borderRadius: '6px', border: '1px solid #222' }}>
                <img src={prod.imagen} alt={prod.nombre} width="40" height="40" style={{ objectFit: 'contain', backgroundColor: '#111', borderRadius: '4px' }} />
                
                <div style={{ flexGrow: 1 }}>
                  <h4 style={{ margin: '0 0 4px 0', fontSize: '1rem' }}>{prod.nombre}</h4>
                  <span style={{ fontSize: '0.85rem', color: '#00f2fe', fontWeight: 'bold' }}>${prod.precio.toLocaleString('es-AR')}</span>
                  <span style={{ fontSize: '0.75rem', color: '#888', marginLeft: '12px', backgroundColor: '#222', padding: '2px 6px', borderRadius: '4px' }}>{prod.categoria}</span>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button onClick={() => iniciarEdicion(prod)} style={{ padding: '6px 12px', backgroundColor: '#222', color: '#00f2fe', border: '1px solid #00f2fe', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 'bold' }}>
                    Editar
                  </button>
                  <button onClick={() => manejarEliminar(prod.id)} style={{ padding: '6px 12px', backgroundColor: 'transparent', color: '#ff4d4d', border: '1px solid #ff4d4d', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 'bold' }}>
                    Borrar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Panel;

