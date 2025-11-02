import React from "react";
import Banner from "../components/Banner";
import ProductForm from "../components/ProductForm";
import "../assets/css/crearProducto.css";
import { FaPlusCircle } from "react-icons/fa";

export default function CrearProducto() {
  return (
    <div>
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
            <ProductForm />
          </div>
        </section>
      </main>
    </div>
  );
}
