import { useState, useEffect } from 'react';

export default function useProductos() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let montado = true;
  setLoading(true);

  const backendUrl = 'http://localhost:3000/api/productos';
    fetch(backendUrl)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
    if (!montado) return;
    setProductos(Array.isArray(data) ? data : []);
    setError(null);
      })
      .catch((err) => {
  if (!montado) return;
  console.error('Error al obtener productos (fetch):', err);
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
