import { Item } from './Item';

export const ItemList = ({ productos }) => {
  return (
    <div className="gridProductos">
      {productos.map((producto) => (
        <Item key={producto.id} producto={producto} />
      ))}
    </div>
  );
};