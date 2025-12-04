import { useState, useEffect, useCallback } from "react";
import { obtenerMisPedidos } from "../services/orderService";
import { useAuth } from "../context/AuthContext";

export default function useOrders() {
  const { token, isAuthenticated } = useAuth();
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const cargarPedidos = useCallback(async () => {
    if (!isAuthenticated || !token) {
      setPedidos([]);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await obtenerMisPedidos(token);
      setPedidos(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error al cargar pedidos:", error);
      setError(error.message || "Error al cargar pedidos");
      setPedidos([]);
    } finally {
      setLoading(false);
    }
  }, [token, isAuthenticated]);

  useEffect(() => {
    cargarPedidos();
  }, [cargarPedidos]);

  const recargarPedidos = () => {
    return cargarPedidos();
  };

  const totalPedidos = pedidos.length;

  const totalGastado = pedidos.reduce((sum, pedido) => {
    return sum + (pedido.total || 0);
  }, 0);

  const estadisticas = {
    total: totalPedidos,
    totalGastado,
  };

  return {
    pedidos,
    loading,
    error,
    recargarPedidos,
    estadisticas,
  };
}
