import React from "react";
import ProductDetail from "../components/ProductDetail";
import { useParams } from "react-router-dom";
import { useProductoById } from "../hooks/useProductoById";

export default function ProductDetailPage({ onVolver, onAgregarAlCarrito }) {
  const { id } = useParams();
  const { producto, loading, error } = useProductoById(id);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p className="error">Error: {error}</p>;
  if (!producto) return <p>No se encontró el producto</p>;

  return (
    <ProductDetail data-bg="light"
      producto={producto.data}
      onVolver={onVolver}
      onAgregarAlCarrito={onAgregarAlCarrito}
    />
  );
}
