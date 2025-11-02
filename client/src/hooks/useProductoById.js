import { useState, useEffect } from "react";
import { getProductoById } from "../services/productoService";

export function useProductoById(id) {
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getProductoById(id)
      .then((data) => {
        setProducto(data);
        setError(null);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  return { producto, loading, error };
}
