import React, { useState, useEffect } from "react";
import "../assets/css/producto.css";

export default function ProductDetail({ producto, onVolver, onAgregarAlCarrito }) {
  const [cantidad, setCantidad] = useState(1);

useEffect(() => {
    if (producto) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [producto]);

  const handleAdd = () => {
    console.log('ProductDetail: handleAdd', { producto, cantidad });
    if (onAgregarAlCarrito) onAgregarAlCarrito(producto, Number(cantidad));
  };

  return (
    <main className="container producto-loaded" role="main">
      {/* Galería del producto */}
      <section className="producto-galeria" aria-label="Galería del producto">
        <figure>
          <img
            id="img-producto"
            src={producto.imagen}
            alt={`Imagen de ${producto.nombre}`}
            loading="lazy"
            width="800"
            height="600"
          />
          <figcaption
            id="product-image-caption"
            className="visually-hidden"
          >
            {producto.nombre}
          </figcaption>
        </figure>
      </section>

      {/* Información del producto */}
      <section className="producto-info" aria-labelledby="product-title">
        <h1 id="producto-titulo" className="titulo-principal">
          {producto.nombre}
        </h1>

        <div className="descripcion" id="desc-producto" aria-labelledby="desc-title">
          <h2 id="desc-titulo">Descripción</h2>
          <p>{producto.descripcion}</p>
        </div>

        <div className="compra">
          <p id="precio-producto" className="precio" aria-live="polite">
            ${producto.precio}
          </p>

          <div className="cantidad-container">
            <input
              id="cantidad"
              type="number"
              name="cantidad"
              min="1"
              max="10"
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
              aria-label="Cantidad"
            />
            <button id="agregar-carrito" className="btn-primary" type="button" onClick={handleAdd}>
              Añadir al carrito
            </button>
          </div>
        </div>

        <button onClick={onVolver} className="btn-secondary">
          ⬅ Volver al catálogo
        </button>
      </section>
    </main>
  );
}
