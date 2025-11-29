import { useState, useEffect } from 'react';
import { getProductos } from '../services/productoService';

export default function useProductos() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadProductos = async () => {
    setLoading(true);
    try {
      const data = await getProductos();

      const productosConDestacado = Array.isArray(data)
        ? data.map((p) => ({
            ...p,
            destacado: p.destacado === true || p.destacado === "true",
          }))
        : [];

      setProductos(productosConDestacado);
      setError(null);
    } catch (err) {
      setError(err.message || "Error al obtener productos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let montado = true;
    // Carga inicial
    if (montado) loadProductos();

    return () => {
      montado = false;
    };
  }, []);

  const reload = () => {
    return loadProductos();
  };

  return { productos, loading, error, reload };
}
