import React from "react";
import "../assets/css/productos.css";

export default function ProductCard({ producto, onSelect }) {
  return (
    <div className="card" onClick={() => onSelect(producto)}>
      <img src={producto.imagen} alt={producto.nombre} />
      <div className="card-body">
        <h3>{producto.nombre}</h3>
        <p>{producto.descripcion}</p>
        <a href="#" onClick={(e) => e.preventDefault()}>
          Ver más
        </a>
      </div>
    </div>
  );
}