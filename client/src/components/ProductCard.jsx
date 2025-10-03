import React from "react";
import "../assets/css/productos.css";

export default function ProductCard({ producto, onSelect }) {
  return (
    <div className="card">
      <img src={producto.imagen} alt={producto.nombre} />
      <div className="card-body">
        <h3>{producto.nombre}</h3>
        <p>{producto.descripcion}</p>
        <p><strong>${producto.precio}</strong></p>
        <button
          className="btn-secondary"
          onClick={() => onSelect(producto)}
        >
          Ver detalle
        </button>
      </div>
    </div>
  );
}
