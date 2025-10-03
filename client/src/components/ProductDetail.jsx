import React from "react";
import "./ProductDetail.css";

export default function ProductDetail({ producto, onClose }) {
  if (!producto) return null;

  return (
    <div className="product-detail">
      <button onClick={onClose}>Cerrar ✖</button>
      <img src={producto.imagen} alt={producto.nombre} />
      <h2>{producto.nombre}</h2>
      <p>{producto.descripcion}</p>
      <p><strong>Precio:</strong> ${producto.precio}</p>
    </div>
  );
}