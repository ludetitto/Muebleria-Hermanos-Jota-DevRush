import React from "react";
import Banner from "../components/Banner";
import ProductForm from "../components/ProductForm";
import "../assets/css/crearProducto.css";
import Swal from "sweetalert2";
import { FaPlusCircle } from "react-icons/fa";

export default function CrearProducto() {
  const handleCrearProducto = async (productoData) => {
    try {
      const response = await fetch("/api/productos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productoData),
      });

      if (!response.ok) throw new Error("Error al crear el producto");

      Swal.fire({
        title: "¡Producto creado!",
        text: "El producto se guardó correctamente en la base de datos.",
        icon: "success",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#3085d6",
        background: "#fefefe",
      });
    } catch (error) {
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
    <div>
      {/* Banner superior */}
      <Banner
        titulo="CREAR PRODUCTO"
        ariaLabel="banner-creacion"
        icon={<FaPlusCircle />}
      />

      <main id="admin-main-content" role="main">
        <section className="admin-prod">
          <h1 className="admin-prod__ttl">
            Complete el siguiente formulario para agregar un producto al catálogo
          </h1>

          <div className="admin-prod__box">
            <ProductForm onSubmit={handleCrearProducto} />
          </div>
        </section>
      </main>
    </div>
  );
}
