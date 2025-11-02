import React from "react";
import ProductForm from "../components/ProductForm";
import "../assets/css/crearProducto.css";
import Swal from "sweetalert2"; // 💡 Importamos SweetAlert2

export default function CrearProducto() {
  const handleCrearProducto = async (productoData) => {
    try {
      const response = await fetch("http://localhost:5000/api/productos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productoData),
      });

      if (!response.ok) throw new Error("Error al crear el producto");

      //  Mensaje de éxito más agradable
      Swal.fire({
        title: "¡Producto creado!",
        text: "El producto se guardó correctamente en la base de datos.",
        icon: "success",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#3085d6",
        background: "#fefefe",
      });
    } catch (error) {
      //  Mensaje de error
      Swal.fire({
        title: "Error",
        text: error.message || "Ocurrió un problema al crear el producto.",
        icon: "error",
        confirmButtonText: "Entendido",
        confirmButtonColor: "#d33",
        background: "#fff5f5",
      });
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
