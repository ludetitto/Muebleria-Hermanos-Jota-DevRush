import React from "react";
import ProductForm from "../components/ProductForm";
import "../assets/css/crearProducto.css";

export default function CrearProducto() {
  const handleCrearProducto = async (productoData) => {
    try {
      const response = await fetch("http://localhost:5000/api/productos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productoData),
      });
      if (!response.ok) throw new Error("Error al crear el producto");
      alert("Producto creado correctamente");
    } catch (error) {
      alert( error.message);
    }
  };

  return (
    <main id="crear-producto-page">
      <section className="crear-producto-container">
        <h1>Crear Producto</h1>
        <ProductForm onSubmit={handleCrearProducto} />
      </section>
    </main>
  );
}
