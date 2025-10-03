import React from "react";
import ProductCard from "./ProductCard";
import "../assets/css/productos.css";

export default function ProductList({ productos, onSelect }) {
  return (
    <div className="grid">
      {productos.map((p) => (
        <ProductCard key={p.id} producto={p} onSelect={onSelect} />
      ))}
    </div>
  );
}