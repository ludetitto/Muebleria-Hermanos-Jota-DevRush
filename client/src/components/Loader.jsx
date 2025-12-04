import React from "react";
import "../assets/css/loader.css";

export default function Loader({ text = "Cargando..." }) {
  return (
    <div className="loader-container">
      <div className="spinner"></div>
      {text && <p className="loader-text">{text}</p>}
    </div>
  );
}
