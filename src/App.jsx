import Layout from "./components/layouts/Layout";
import { ItemListContainer } from './components/products/ItemListContainer';
import './App.css';

function App() {
  return (
    <Layout>
      <ItemListContainer greeting="Catálogo de Productos" />
    </Layout>
  );
}

export default App;
