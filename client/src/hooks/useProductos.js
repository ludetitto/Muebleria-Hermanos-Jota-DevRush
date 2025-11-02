import { useState, useEffect } from 'react';
import { getProductos } from '../services/productoService';

export default function useProductos() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let montado = true;
    setLoading(true);

    getProductos()
      .then((data) => {
        if (!montado) return;

        // Convertimos 'destacado' a booleano
        const productosConDestacado = Array.isArray(data)
          ? data.map(p => ({
              ...p,
              destacado: p.destacado === true || p.destacado === "true",
            }))
          : [];

        setProductos(productosConDestacado);
        setError(null);
      })
      .catch((err) => {
        if (!montado) return;
        setError(err.message || 'Error al obtener productos');
      })
      .finally(() => {
        if (!montado) return;
        setLoading(false);
      });

    return () => {
      montado = false;
    };
  }, []);

  return { productos, loading, error };
}
