import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductDetail from "../components/ProductDetail";

export default function ProductDetailPage({ producto, onBack }) {
  return (
    <>
      <Navbar />
      <main>
        <ProductDetail producto={producto} onBack={onBack} />
      </main>
      <Footer />
    </>
  );
}
