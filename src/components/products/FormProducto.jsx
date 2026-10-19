export const FormProducto = ({ 
  nuevoProducto, 
  handleInputChange, 
  handleFileChange, 
  handleSubmit, 
  cargando, 
  imagenFile 
}) => {
  return (
    <section style={{ maxWidth: '500px', margin: '20px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h2>Cargar Nuevo Producto</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="nombre">Nombre:</label>
          <input
            id="nombre"
            name="nombre"
            type="text"
            value={nuevoProducto.nombre || ''}
            onChange={handleInputChange}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="precio">Precio:</label>
          <input
            id="precio"
            name="precio"
            type="number"
            value={nuevoProducto.precio || ''}
            onChange={handleInputChange}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="stock">Stock:</label>
          <input
            id="stock"
            name="stock"
            type="number"
            value={nuevoProducto.stock || ''}
            onChange={handleInputChange}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="categoria">Categoría:</label>
          <input
            id="categoria"
            name="categoria"
            type="text"
            value={nuevoProducto.categoria || ''}
            onChange={handleInputChange}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="descripcion">Descripción:</label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={nuevoProducto.descripcion || ''}
            onChange={handleInputChange}
            style={{ width: '100%', padding: '8px', marginTop: '5px', minHeight: '80px' }}
          />
        </div>

        <button
          type="submit"
          style={{ padding: '10px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Guardar Producto
        </button>
      </form>
    </section>
  );
};

export default FormProducto;