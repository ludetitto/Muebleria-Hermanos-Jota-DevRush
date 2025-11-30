import React, { createContext, useState, useEffect, useContext } from "react";
import { useAuth } from "./AuthContext";
import API_ENDPOINTS from "../config/api";

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
  const [loading, setLoading] = useState(false);
  const { isAuthenticated, token, user } = useAuth();

  // Cargar carrito desde localStorage para users no autenticados
  useEffect(() => {
    if (!isAuthenticated) {
      try {
        const savedCart = localStorage.getItem("cart");
        if (savedCart) {
          const parsed = JSON.parse(savedCart);
          if (Array.isArray(parsed)) {
            setCarrito(parsed);
          }
        }
      } catch (error) {
        console.error("Error al cargar carrito local:", error);
      }
    }
  }, [isAuthenticated]);

  // Sincronizar carrito con el servidor cuando el usuario inicia sesión
  useEffect(() => {
    const syncCartWithServer = async () => {
      if (isAuthenticated && token) {
        setLoading(true);
        try {
          const localCart = localStorage.getItem("cart");
          const localItems = localCart ? JSON.parse(localCart) : [];

          if (localItems.length > 0) {
            const response = await fetch(`${API_ENDPOINTS.CART.SYNC}`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({ items: localItems }),
            });

            if (response.ok) {
              const data = await response.json();
              setCarrito(formatCartItems(data.cart));
              localStorage.removeItem("cart");
            }
          } else {
            const response = await fetch(API_ENDPOINTS.CART.BASE, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });

            if (response.ok) {
              const data = await response.json();
              setCarrito(formatCartItems(data.cart));
            }
          }
        } catch (error) {
          console.error("Error al sincronizar carrito:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    syncCartWithServer();
  }, [isAuthenticated, token]);

  //guardar en storage si no esta autenticado
  useEffect(() => {
    if (!isAuthenticated) {
      try {
        localStorage.setItem("cart", JSON.stringify(carrito));
      } catch (error) {
        console.error("Error al guardar carrito local:", error);
      }
    }
  }, [carrito, isAuthenticated]);

  const formatCartItems = (items) => {
    return items.map((item) => ({
      id: item.productId || item._id || item.id,
      nombre: item.nombre,
      precio: item.precio,
      imagen: item.imagen,
      descripcion: item.descripcion,
      cantidad: item.cantidad,
    }));
  };

  const agregarAlCarrito = async (producto, cantidad = 1) => {
    if (isAuthenticated && token) {
      console.log("Agregando al carrito");
      try {
        const response = await fetch(API_ENDPOINTS.CART.ADD, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            productId: producto.id || producto._id,
            cantidad,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          setCarrito(formatCartItems(data.cart));
          console.log("Se agrego al carrito con exito");
        } else {
          throw new Error("Error al agregar al carrito");
        }
      } catch (error) {
        console.error("Error al agregar al carrito:", error);
        throw error;
      }
    } else {
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
    }
  };

  const actualizarCantidad = async (productId, cantidad) => {
    if (cantidad <= 0) {
      eliminarDelCarrito(productId);
      return;
    }

    if (isAuthenticated && token) {
      try {
        const response = await fetch(
          `${API_ENDPOINTS.CART.UPDATE(productId)}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ cantidad }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          setCarrito(formatCartItems(data.cart));
        }
      } catch (error) {
        console.error("Error al actualizar cantidad:", error);
      }
    } else {
      setCarrito((prevCarrito) =>
        prevCarrito.map((item) =>
          String(item.id) === String(productId) ? { ...item, cantidad } : item
        )
      );
    }
  };

  const eliminarDelCarrito = async (productId) => {
    if (isAuthenticated && token) {
      try {
        const response = await fetch(
          `${API_ENDPOINTS.CART.REMOVE(productId)}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setCarrito(formatCartItems(data.cart));
        }
      } catch (error) {
        console.error("Error al eliminar del carrito:", error);
      }
    } else {
      setCarrito((prevCarrito) =>
        prevCarrito.filter((item) => String(item.id) !== String(productId))
      );
    }
  };

  const vaciarCarrito = async () => {
    if (isAuthenticated && token) {
      try {
        const response = await fetch(API_ENDPOINTS.CART.CLEAR, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          setCarrito([]);
        }
      } catch (error) {
        console.error("Error al vaciar carrito:", error);
      }
    } else {
      setCarrito([]);
    }
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
    loading,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
