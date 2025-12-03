import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import "../assets/css/productos.css";
import fallbackImg from "../assets/productos/background.jpg";

const imagesMap = (() => {
  const map = {};
  try {
    const req = require.context(
      "../assets/productos",
      false,
      /\.(png|jpe?g|svg|webp|bmp)$/
    );
    req.keys().forEach((key) => {
      const name = key.replace("./", "");
      const resolved = req(key);
      map[name] = resolved?.default || resolved;
    });
  } catch (e) {}
  return map;
})();

function traerImagen(imagen) {
  if (!imagen) return fallbackImg;
  if (typeof imagen === "string") {
    if (/^https?:\/\//.test(imagen) || imagen.startsWith("/assets/"))
      return imagen;
    if (imagen.startsWith("/images/")) {
      const filename = imagen.split("/").pop();
      return `/assets/productos/${filename}`;
    }
    const parts = imagen.split("/");
    const filename = parts[parts.length - 1];
    return (
      imagesMap[filename] || `/assets/productos/${filename}` || fallbackImg
    );
  }
  return fallbackImg;
}

export default function ProductCard({ producto = {}, onSelect = null }) {
  const navigate = useNavigate();
  const img = traerImagen(producto?.imagen);
  const priceFormatted =
    typeof producto?.precio === "number"
      ? new Intl.NumberFormat("es-AR", {
          style: "currency",
          currency: "ARS",
        }).format(producto.precio)
      : producto?.precio ?? "";

  const handleVerDetalle = () => {
    const id = producto._id || producto.id;

    if (onSelect) {
      onSelect(producto);
    } else {
      navigate(`/productos/${id}`);
    }
  };

  return (
    <div className="card" role="article" style={{ position: "relative" }}>
      {producto.destacado && (
        <span
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            backgroundColor: "#87a96b",
            color: "#fff",
            padding: "2px 6px",
            borderRadius: "4px",
            fontSize: "0.8rem",
            zIndex: 2,
          }}
        >
          Destacado
        </span>
      )}

      <img src={img} alt={producto?.nombre ?? "Producto"} loading="lazy" />

      <div className="card-body">
        <h3>{producto?.nombre ?? "Sin nombre"}</h3>
        <p>{producto?.descripcion ?? "Sin descripción"}</p>
        <p>
          <strong>{priceFormatted}</strong>
        </p>
        {producto.categoria && (
          <p>
            <strong>Categoría:</strong> {producto.categoria}
          </p>
        )}
        {producto.stock !== undefined && (
          <p>
            <strong>Stock:</strong> {producto.stock}
          </p>
        )}
        <button
          className="btn-secondary"
          onClick={handleVerDetalle}
          aria-label={`Ver detalle de ${producto?.nombre ?? "producto"}`}
        >
          Ver detalle
        </button>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  producto: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    nombre: PropTypes.string,
    descripcion: PropTypes.string,
    precio: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    imagen: PropTypes.string,
    categoria: PropTypes.string,
    stock: PropTypes.number,
    destacado: PropTypes.bool,
  }),
  onSelect: PropTypes.func,
};

ProductCard.defaultProps = {
  producto: {},
  onSelect: null,
};
