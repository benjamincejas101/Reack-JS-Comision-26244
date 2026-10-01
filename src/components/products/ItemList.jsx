import { Item } from './Item';

export const ItemList = ({ productos }) => {
  return (
    <>
      {productos.map((producto) => (
        <Item key={producto.id} producto={producto} />
      ))}
    </>
  );
};