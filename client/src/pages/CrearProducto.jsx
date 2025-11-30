import React from "react";
import Banner from "../components/Banner";
import ProductForm from "../components/ProductForm";
import { crearProducto } from "../services/productoService";
import { useNavigate } from "react-router-dom";
import "../assets/css/crearProducto.css";

export default function CrearProducto() {
  const navigate = useNavigate();

  const handleSubmit = async (productoData) => {
    try {
      await crearProducto(productoData);
      /*
      setTimeout(() => {
        navigate("/productos");
      }, 2000)
      */
    } catch (error) {
      console.error("Error al crear producto:", error);
      throw error;
    }
  };

  const handleCancel = () => {
    navigate("/productos");
  };

  return (
    <>
      <Banner titulo="CREAR PRODUCTO" ariaLabel="banner-crear-producto" />

      <main
        className="tight-container crear-producto-container"
        role="main"
        data-bg="light"
      >
        <section className="crear-producto-intro info-text">
          <h2>Administración de Productos</h2>
          <p>
            Complete el formulario a continuación para agregar un nuevo producto
            al catálogo de Mueblería Hermanos Jota. Los campos marcados con{" "}
            <span className="required-indicator">*</span> son obligatorios.
          </p>
        </section>

        <ProductForm onSubmit={handleSubmit} onCancel={handleCancel} />
      </main>
    </>
  );
}
