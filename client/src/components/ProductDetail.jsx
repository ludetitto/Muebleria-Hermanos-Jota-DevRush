import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { FaTrashAlt, /* FaShoppingCart, */ FaArrowLeft } from "react-icons/fa"; // Carrito comentado
import { useNavigate } from "react-router-dom";
import { eliminarProducto } from "../services/productoService";
import "../assets/css/producto.css";

const PALETA_COLORES = {
  primario: "#a0522d",
  acentoSecundario: "#87a96b",
  fondoPrincipal: "#f5e6d3",
  detalles: "#d4a437",
  acentosSuaves: "#c47a6d",
  texto: "#333",
};

export default function ProductDetail({
  producto,
  onVolver /*, onAgregarAlCarrito */,
}) {
  const [cantidad, setCantidad] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    if (producto) {
      console.log("Producto recibido en detalle:", producto);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [producto]);

  /* const handleAdd = () => {
    if (onAgregarAlCarrito) onAgregarAlCarrito(producto, Number(cantidad));
  }; */

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
    <main className="producto-loaded" role="main">
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

        {/* Mostrar categoría */}
        <div className="producto-categoria">
          <strong>Categoría:</strong> {producto.categoria ?? "Sin categoría"}
        </div>

        {/* Mostrar detalles del producto */}
        {producto.detalles && Object.keys(producto.detalles).length > 0 && (
          <div className="producto-detalles">
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

        {/*
        <div className="cantidad-container">
          <label htmlFor="cantidad">Cantidad:</label>
          <input
            id="cantidad"
            type="number"
            min="1"
            max="10"
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
          />
          <button className="btn-agregar" onClick={handleAdd}>
            <FaShoppingCart /> Añadir al carrito
          </button>
        </div>
        */}

        <div className="acciones-producto">
          <button onClick={onVolver} className="btn-secondary">
            <FaArrowLeft /> Volver al catálogo
          </button>
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
        </div>
      </section>
    </main>
  );
}
