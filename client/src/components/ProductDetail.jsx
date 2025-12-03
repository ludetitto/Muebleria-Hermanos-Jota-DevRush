import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { FaTrashAlt, /* FaShoppingCart, */ FaArrowLeft } from "react-icons/fa";
import QuantityControl from "./QuantityControl";
import { useNavigate } from "react-router-dom";
import { eliminarProducto } from "../services/productoService";
import "../assets/css/producto.css";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const PALETA_COLORES = {
  primario: "#a0522d",
  acentoSecundario: "#87a96b",
  fondoPrincipal: "#f5e6d3",
  detalles: "#d4a437",
  acentosSuaves: "#c47a6d",
  texto: "#333",
};

export default function ProductDetail({ producto, onVolver }) {
  const [cantidad, setCantidad] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    if (producto) {
      console.log("Producto recibido en detalle:", producto);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [producto]);

  const { user } = useAuth();
  const { agregarAlCarrito } = useCart();

  const handleCantidadChange = (productoId, nuevaCantidad) => {
    setCantidad(nuevaCantidad);
  };

  const handleAgregar = () => {
    try {
      agregarAlCarrito(producto, Number(cantidad));

      Swal.fire({
        title: "Agregado al carrito",
        text: `"${producto.nombre}" fue añadido al carrito.`,
        icon: "success",
        iconColor: "var(--acento-secundario-color)",
        background: "#fff",
        color: PALETA_COLORES.texto,
        customClass: {
          container: "add-prod-modal-overlay",
          popup: "add-prod-modal",
          confirmButton: "btn-primary",
        },
      });
    } catch (error) {
      console.error("Error agregando al carrito:", error);
      Swal.fire({
        title: "Error",
        text: "No se pudo agregar el producto al carrito.",
        icon: "error",
        background: PALETA_COLORES.fondoPrincipal,
        color: PALETA_COLORES.texto,
        confirmButtonColor: PALETA_COLORES.primario,
      });
    }
  };

  const handleEliminar = async () => {
    const idAEliminar = producto._id || producto.id;
    console.log("🗑️ ID a eliminar:", idAEliminar);

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
        if (!idAEliminar) {
          Swal.fire({
            title: "Error",
            text: "No se encontró el ID del producto para eliminar.",
            icon: "error",
            background: PALETA_COLORES.fondoPrincipal,
            color: PALETA_COLORES.texto,
            confirmButtonColor: PALETA_COLORES.primario,
          });
          return;
        }

        await eliminarProducto(idAEliminar);

        await Swal.fire({
          title: "Producto eliminado",
          text: `"${producto.nombre}" fue eliminado correctamente.`,
          icon: "success",
          background: PALETA_COLORES.fondoPrincipal,
          color: PALETA_COLORES.texto,
          confirmButtonColor: PALETA_COLORES.primario,
          iconColor: PALETA_COLORES.acentoSecundario,
        });

        onVolver ? onVolver() : navigate("/productos");
      } catch (error) {
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

  const priceFormatted =
    typeof producto?.precio === "number"
      ? new Intl.NumberFormat("es-AR", {
          style: "currency",
          currency: "ARS",
        }).format(producto.precio)
      : producto?.precio ?? "";

  return (
    <main className="container" role="main" data-bg="light">
      <section className="producto-galeria">
        <figure>
          {producto.imagen ? (
            <img
              id="img-producto"
              src={producto.imagen}
              alt={`Imagen de ${producto.nombre}`}
              loading="lazy"
              width="800"
              height="600"
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "400px",
                backgroundColor: "#f5e6d3",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#a0522d",
                borderRadius: "8px",
              }}
            >
              <p>📷 Imagen no disponible</p>
            </div>
          )}
        </figure>
      </section>

      <section className="producto-info">
        <h1 className="producto-nombre">{producto.nombre}</h1>
        <p className="producto-descripcion">{producto.descripcion}</p>

        <div className="producto-precio">{priceFormatted}</div>

        {/* Mostrar stock */}
        <div className="producto-stock">
          <strong>Stock disponible:</strong> {producto.stock ?? 0}
        </div>

        {/* Mostrar detalles del producto */}
        {producto.detalles && Object.keys(producto.detalles).length > 0 && (
          <div className="detalle-producto">
            <h3>Detalles del producto</h3>
            <ul>
              {Object.entries(producto.detalles).map(([key, value]) => (
                <li key={key}>
                  <strong>{key}:</strong> {value.toString()}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="cantidad-container">
          <label htmlFor="cantidad">Cantidad</label>
          <div className="flex-container">
            <QuantityControl
              productoId={producto.id}
              cantidad={cantidad}
              actualizarCantidad={handleCantidadChange}
            />
            <button className="btn-agregar btn-primary" onClick={handleAgregar}>
              Añadir al carrito
            </button>

            <button className="btn-agregar-short btn-primary" onClick={handleAgregar}>
              Añadir
            </button>
          </div>
        </div>

        <div className="acciones-producto">
          <button onClick={onVolver} className="btn-secondary">
            <FaArrowLeft /> Volver al catálogo
          </button>

          {user && user.role === "admin" ? (
            <>
              <button onClick={handleEliminar} className="btn-eliminar">
                <FaTrashAlt /> Eliminar
              </button>
              <button
                className="btn-secondary"
                onClick={() =>
                  navigate(`/productos/editar/${producto._id || producto.id}`)
                }
              >
                Editar
              </button>
            </>
          ) : (
            <></>
          )}
        </div>
      </section>
    </main>
  );
}
