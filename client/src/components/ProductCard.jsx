import React from "react";
import PropTypes from "prop-types";
import "../assets/css/productos.css";
import fallbackImg from "../assets/productos/background.jpg";

const imagesMap = (() => {
  const map = {};
  try {
    const req = require.context("../assets/productos", false, /\.(png|jpe?g|svg|webp|bmp)$/);
    req.keys().forEach((key) => {
      const name = key.replace("./", "");
      const resolved = req(key);
      map[name] = resolved?.default || resolved;
    });
  } catch (e) {
  }
  return map;
})();

function traerImagen(imagen) {
  if (!imagen) return fallbackImg;
  if (typeof imagen === "string") {
    // Si ya es una URL absoluta o empieza con /assets, se deja
    if (/^https?:\/\//.test(imagen) || imagen.startsWith("/assets/")) return imagen;

    // Si viene con /images/.., mapeo al public assets
    if (imagen.startsWith("/images/")) {
      const filename = imagen.split('/').pop();
      return `/assets/productos/${filename}`;
    }

    // Si viene con ../assets/productos/Name.png o sólo filename
    const parts = imagen.split("/");
    const filename = parts[parts.length - 1];
    return imagesMap[filename] || `/assets/productos/${filename}` || fallbackImg;
  }
  return fallbackImg;
}

export default function ProductCard({ producto = {}, onSelect = null }) {
  const img = traerImagen(producto?.imagen);
  const priceFormatted = typeof producto?.precio === "number"
    ? new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS" }).format(producto.precio)
    : producto?.precio ?? "";

  return (
    <div className="card" role="article">
      <img src={img} alt={producto?.nombre ?? "Producto"} />
      <div className="card-body">
        <h3>{producto?.nombre ?? "Sin nombre"}</h3>
        <p>{producto?.descripcion ?? "Sin descripción"}</p>
        <p><strong>{priceFormatted}</strong></p>
        <button
          className="btn-secondary"
          onClick={() => onSelect && onSelect(producto)}
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
  }),
  onSelect: PropTypes.func,
};

ProductCard.defaultProps = {
  producto: {},
  onSelect: null,
};
