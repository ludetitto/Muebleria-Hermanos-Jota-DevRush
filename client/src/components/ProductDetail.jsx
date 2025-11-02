import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { FaTrashAlt } from 'react-icons/fa'; // Icono de papelera
import { useNavigate } from "react-router-dom"; 
import "../assets/css/producto.css";

// 🎨 Paleta de Colores (Definida como constante en el componente)
const PALETA_COLORES = {
    primario: '#a0522d',          
    acentoSecundario: '#87a96b',  
    fondoPrincipal: '#f5e6d3',    
    detalles: '#d4a437',          
    acentosSuaves: '#c47a6d',     // Usado para el botón Eliminar y Error
    texto: '#333',
};


export default function ProductDetail({
  producto,
  onVolver,
  onAgregarAlCarrito,
}) {
  const [cantidad, setCantidad] = useState(1);
  const navigate = useNavigate(); 

  useEffect(() => {
    if (producto) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [producto]);

  const handleAdd = () => {
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

  // 🔹 FUNCIÓN DE ELIMINACIÓN
  const handleEliminar = async () => {
    const confirm = await Swal.fire({
      title: "¿Eliminar producto?",
      text: `¿Seguro que deseas eliminar "${producto.nombre}"? Esta acción no se puede deshacer.`,
      icon: "warning",
      background: PALETA_COLORES.fondoPrincipal,
      color: PALETA_COLORES.texto,
      iconColor: PALETA_COLORES.detalles,
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: PALETA_COLORES.primario,
      cancelButtonColor: PALETA_COLORES.acentosSuaves,
    });

    if (confirm.isConfirmed) {
      try {
        // Petición DELETE al backend
        const response = await fetch(
          `/api/productos/${producto._id}`, 
          { method: "DELETE" }
        );

        if (!response.ok) throw new Error("No se pudo eliminar el producto.");

        // Alerta de éxito
        await Swal.fire({
          title: "Producto eliminado",
          text: `"${producto.nombre}" fue eliminado correctamente.`,
          icon: "success",
          background: PALETA_COLORES.fondoPrincipal,
          color: PALETA_COLORES.texto,
          confirmButtonColor: PALETA_COLORES.primario,
          iconColor: PALETA_COLORES.acentoSecundario,
        });

        // Redirigir al catálogo
        if (onVolver) {
            onVolver(); 
        } else {
            navigate('/catalogo'); 
        }
      } catch (error) {
        // Alerta de error
        Swal.fire({
          title: "Error",
          text: error.message,
          icon: "error",
          background: PALETA_COLORES.fondoPrincipal,
          color: PALETA_COLORES.texto,
          confirmButtonColor: PALETA_COLORES.primario,
          iconColor: PALETA_COLORES.acentosSuaves,
        });
      }
    }
  };

  const renderDetalles = () => {
    if (!producto.detalles) return null;

    return Object.keys(producto.detalles).map((key) => (
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
        </figure>
      </section>

      {/* Información del producto */}
      <section className="producto-info">
        <h1 className="titulo-principal">{producto.nombre}</h1>

        <div className="descripcion">
          <p>{producto.descripcion}</p>
        </div>

        <div className="compra">
          <p className="precio">{priceFormatted}</p>

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

        {renderDetalles()}

        {/* Botones de acción */}
        <div className="acciones-producto">
          <button onClick={onVolver} className="btn-secondary">
            ⬅ Volver al catálogo
          </button>

          <button
            onClick={handleEliminar}
            className="btn-eliminar"
          >
            <FaTrashAlt style={{ verticalAlign: 'middle', marginRight: '5px' }} /> Eliminar
          </button>
        </div>
      </section>
    </main>
  );
}