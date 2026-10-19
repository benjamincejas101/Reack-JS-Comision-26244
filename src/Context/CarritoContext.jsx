// src/context/CarritoContext.jsx
import { createContext, useContext, useState } from 'react';

// 1. Creamos el contexto nativo de React
export const CarritoContext = createContext();

// 2. Custom Hook para consumir el contexto de forma limpia y rápida
export const useCarrito = () => {
  const context = useContext(CarritoContext);
  if (!context) {
    throw new Error('useCarrito debe ser usado dentro de un CarritoProvider');
  }
  return context;
};

// 3. Componente Proveedor que envolverá a toda la aplicación
export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  // AGREGAR AL CARRITO: Si el producto ya existe, suma la cantidad; si no, lo agrega nuevo
  const agregarAlCarrito = (producto, cantidad) => {
    const itemExistente = carrito.find(item => item.id === producto.id);

    if (itemExistente) {
      setCarrito(
        carrito.map(item =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + cantidad }
            : item
        )
      );
    } else {
      setCarrito([...carrito, { ...producto, cantidad }]);
    }
  };

  // ELIMINAR UN PRODUCTO: Quita el artículo completo por su ID
  const eliminarDelCarrito = (id) => {
    setCarrito(carrito.filter(item => item.id !== id));
  };

  // INCREMENTAR CANTIDAD: Botón (+) de la página del carrito
  const incrementarCantidad = (id) => {
    setCarrito(
      carrito.map(item =>
        item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item
      )
    );
  };

  // DECREMENTAR CANTIDAD: Botón (-) de la página del carrito (frena en 1)
  const decrementarCantidad = (id) => {
    setCarrito(
      carrito.map(item =>
        item.id === id && item.cantidad > 1
          ? { ...item, cantidad: item.cantidad - 1 }
          : item
      )
    );
  };

  // VACIAR CARRITO: Botón para limpiar toda la compra
  const vaciarCarrito = () => {
    setCarrito([]);
  };

  // CANTIDAD TOTAL: Devuelve el número total de ítems (para el icono del carrito en la barra Nav)
  const cantidadTotal = () => {
    return carrito.reduce((acc, item) => acc + item.cantidad, 0);
  };

  // COBRO TOTAL: Devuelve la suma acumulada de los precios por sus cantidades
  const cobroTotal = () => {
    return carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  };

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        eliminarDelCarrito,
        incrementarCantidad,
        decrementarCantidad,
        vaciarCarrito,
        cantidadTotal,
        cobroTotal
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
};
