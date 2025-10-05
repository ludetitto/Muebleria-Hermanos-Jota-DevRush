import React from "react";
import Footer from "../components/Footer";
import ProductDetail from "../components/ProductDetail";

export default function ProductDetailPage({ producto, onVolver, onAgregarAlCarrito }) {
  return (
    <>
      <main>
        <ProductDetail producto={producto} onVolver={onVolver} onAgregarAlCarrito={onAgregarAlCarrito} />
      </main>
      <Footer />
    </>
  );
}
