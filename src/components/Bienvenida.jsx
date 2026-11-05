import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, getDocs } from "firebase/firestore";
import { Item } from "./products/Item";

export const Bienvenida = ({ nombreUsuario }) => {
  const [productos, setProductos] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [categoriaActiva, setCategoriaActiva] = useState("todos");
  const [loading, setLoading] = useState(true);

  const obtenerCatalogo = async () => {
    try {
      setLoading(true);
      const productosRef = collection(db, "Productos");
      const querySnapshot = await getDocs(productosRef);
      const docs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProductos(docs);
      setProductosFiltrados(docs);
    } catch (error) {
      console.error("Error al leer Firestore: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    obtenerCatalogo();
  }, []);

  const filtrarCategoria = (categoria) => {
    setCategoriaActiva(categoria);
    if (categoria === "todos") {
      setProductosFiltrados(productos);
    } else {
      setProductosFiltrados(productos.filter(p => p.categoria.toLowerCase() === categoria.toLowerCase()));
    }
  };

  if (loading) {
    return (
      <div style={{ color: "#00f2fe", textAlign: "center", marginTop: "100px", fontSize: "1.2rem", fontWeight: "bold", letterSpacing: "1px" }}>
        Cargando componentes...
      </div>
    );
  }

  return (
    <div style={{ color: "#fff", padding: "0 20px", maxWidth: "1300px", margin: "0 auto", boxSizing: "border-box" }}>
      <section style={{ textAlign: "center", padding: "40px 20px", margin: "10px 0", borderBottom: "1px solid #151515" }}>
        <h1 style={{ fontSize: "2.6rem", margin: "0 0 12px 0", color: "#fff", fontWeight: 900, letterSpacing: "1px" }}>
          Bienvenidos a <span style={{ color: "#00f2fe" }}>BCD TECH</span>
        </h1>
        <p style={{ color: "#888", fontSize: "1.15rem", fontWeight: 500, margin: "0 auto" }}>
          Especialistas en productos electrónicos y componentes de alta gama.
        </p>
      </section>

      <div style={{ display: "flex", gap: "12px", marginBottom: "40px", justifyContent: "center", flexWrap: "wrap" }}>
        {["todos", "Hardware", "Periféricos", "Audio"].map((cat) => (
          <button 
            key={cat} 
            onClick={() => filtrarCategoria(cat)} 
            style={{ 
              padding: "10px 22px", 
              backgroundColor: categoriaActiva === cat ? "#00f2fe" : "#0c0c0c", 
              color: categoriaActiva === cat ? "#000" : "#fff", 
              border: categoriaActiva === cat ? "1px solid #00f2fe" : "1px solid #222", 
              borderRadius: "4px", 
              cursor: "pointer", 
              fontWeight: "bold", 
              fontSize: "0.95rem", 
              textTransform: "capitalize", 
              boxShadow: categoriaActiva === cat ? "0 0 12px rgba(0, 242, 254, 0.4)" : "none", 
              transition: "all 0.2s ease-in-out" 
            }}
          >
            {cat === "todos" ? "Ver Todos" : cat}
          </button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(285px, 1fr))", gap: "30px", width: "100%", boxSizing: "border-box", marginBottom: "60px" }}>
        {productosFiltrados.map(producto => (
          <Item key={producto.id} producto={producto} />
        ))}
      </div>

      {productosFiltrados.length === 0 && (
        <p style={{ textAlign: "center", color: "#666", fontSize: "1.1rem", marginTop: "40px" }}>
          No hay artículos cargados en esta categoría actualmente.
        </p>
      )}
    </div>
  );
};

export default Bienvenida;
