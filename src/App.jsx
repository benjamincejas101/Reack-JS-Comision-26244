import { Routes, Route } from 'react-router-dom';
import { Nav } from './components/layouts/Nav';
import { ItemListContainer } from './components/products/ItemListContainer';
import { FormProductosContainer } from './components/products/FormProductosContainer';
import { Asistentes } from './components/Asistentes';
import { Bienvenida } from './components/Bienvenida';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <Nav />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Bienvenida nombreUsuario="Gamer" />} />
          <Route path="/productos" element={<ItemListContainer />} />
          <Route path="/categoria/:idCategoria" element={<ItemListContainer />} />
          <Route path="/cargar-producto" element={<FormProductosContainer />} />
          <Route path="/contacto" element={<Asistentes />} />
          <Route path="*" element={<h2 style={{ textAlign: 'center', marginTop: '50px' }}>404 - Página no encontrada</h2>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
