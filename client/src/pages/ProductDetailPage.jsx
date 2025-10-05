import React from "react";
import ProductDetail from "../components/ProductDetail";

export default function ProductDetailPage({
  producto,
  onVolver,
  onAgregarAlCarrito,
}) {
  return (
      <ProductDetail
        producto={producto}
        onVolver={onVolver}
        onAgregarAlCarrito={onAgregarAlCarrito}
      />
  );
}
