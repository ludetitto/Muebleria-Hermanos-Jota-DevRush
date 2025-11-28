import React, { createContext, useState, useEffect, useContext } from "react";

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe usarse dentro de CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("hj_cart");
      if (savedCart) {
        const parsed = JSON.parse(savedCart);
        if (Array.isArray(parsed)) {
          setCarrito(parsed);
        }
      }
    } catch (error) {
      console.error("Error al cargar carrito:", error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("hj_cart", JSON.stringify(carrito));
    } catch (error) {
      console.error("Error al guardar carrito:", error);
    }
  }, [carrito]);

  const agregarAlCarrito = (producto, cantidad = 1) => {
    setCarrito((prevCarrito) => {
      const existente = prevCarrito.find(
        (item) =>
          String(item.id || item._id) === String(producto.id || producto._id)
      );

      if (existente) {
        return prevCarrito.map((item) =>
          String(item.id || item._id) === String(producto.id || producto._id)
            ? { ...item, cantidad: (item.cantidad || 1) + cantidad }
            : item
        );
      }

      return [
        ...prevCarrito,
        {
          ...producto,
          id: producto.id || producto._id,
          cantidad,
        },
      ];
    });
  };

  const actualizarCantidad = (productId, cantidad) => {
    if (cantidad <= 0) {
      eliminarDelCarrito(productId);
      return;
    }

    setCarrito((prevCarrito) =>
      prevCarrito.map((item) =>
        String(item.id) === String(productId) ? { ...item, cantidad } : item
      )
    );
  };

  const eliminarDelCarrito = (productId) => {
    setCarrito((prevCarrito) =>
      prevCarrito.filter((item) => String(item.id) !== String(productId))
    );
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  const calcularTotal = () => {
    return carrito.reduce((total, item) => {
      return total + (item.precio || 0) * (item.cantidad || 1);
    }, 0);
  };

  const contadorCarrito = carrito.reduce((total, item) => {
    return total + (item.cantidad || 1);
  }, 0);

  const value = {
    carrito,
    agregarAlCarrito,
    actualizarCantidad,
    eliminarDelCarrito,
    vaciarCarrito,
    calcularTotal,
    contadorCarrito,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
