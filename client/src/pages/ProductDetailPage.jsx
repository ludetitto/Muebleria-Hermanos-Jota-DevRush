import React from "react";
import Footer from "../components/Footer";
import ProductDetail from "../components/ProductDetail";

export default function ProductDetailPage({ producto, onBack, onAddToCart }) {
  return (
    <>
      <main>
        <ProductDetail producto={producto} onBack={onBack} onAddToCart={onAddToCart} />
      </main>
      <Footer />
    </>
  );
}
