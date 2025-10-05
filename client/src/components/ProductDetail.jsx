import React, { useState, useEffect } from "react";
import "../assets/css/producto.css";

export default function ProductDetail({
  producto,
  onVolver,
  onAgregarAlCarrito,
}) {
  const [cantidad, setCantidad] = useState(1);

  useEffect(() => {
    if (producto) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [producto]);

  const handleAdd = () => {
    console.log("ProductDetail: handleAdd", { producto, cantidad });
    if (onAgregarAlCarrito) onAgregarAlCarrito(producto, Number(cantidad));
  };

  const parsearMateriales = (materiales) => {
    if (!materiales) return "";
    return materiales
      .split(",")
      .map((material) => `<li>${material.trim()}</li>`)
      .join("");
  };

  const priceFormatted =
    typeof producto?.precio === "number"
      ? new Intl.NumberFormat("es-AR", {
          style: "currency",
          currency: "ARS",
        }).format(producto.precio)
      : producto?.precio ?? "";

  // Renderizar detalles del producto
  const renderDetalles = () => {
    if (!producto.detalles) return null;

    const detallesKeys = Object.keys(producto.detalles);

    return detallesKeys.map((key) => (
      <div key={key} className="detalle-producto">
        <h3 id="detalle-titulo">
          {key.charAt(0).toUpperCase() + key.slice(1)}
        </h3>
        {key === "materiales" ? (
          <ul
            id="producto-materiales"
            dangerouslySetInnerHTML={{
              __html: parsearMateriales(producto.detalles[key]),
            }}
          />
        ) : (
          <p>{producto.detalles[key]}</p>
        )}
      </div>
    ));
  };

  return (
    <main className="producto-loaded" role="main" data-bg="light">
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
          <figcaption id="product-image-caption" className="visually-hidden">
            {producto.nombre}
          </figcaption>
        </figure>
      </section>

      {/* Información del producto */}
      <section className="producto-info" aria-labelledby="product-title">
        <h1 id="producto-titulo" className="titulo-principal">
          {producto.nombre}
        </h1>

        <div
          className="descripcion"
          id="desc-producto"
          aria-labelledby="desc-title"
        >
          <h2 id="desc-titulo"></h2>
          <p>{producto.descripcion}</p>
        </div>

        <div className="compra">
          <p id="precio-producto" className="precio" aria-live="polite">
            {priceFormatted}
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
            <button
              id="agregar-carrito"
              className="btn-primary"
              type="button"
              onClick={handleAdd}
            >
              Añadir al carrito
            </button>
          </div>
        </div>

        {/* Detalles del producto */}
        {renderDetalles()}

        <button onClick={onVolver} className="btn-secondary">
          ⬅ Volver al catálogo
        </button>
      </section>
    </main>
  );
}
