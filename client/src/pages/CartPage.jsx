import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import Banner from "../components/Banner";
import EmptyView from "../components/EmptyView";
import Swal from "sweetalert2";
import ConfirmModal from "../components/ConfirmModal";
import useConfirmModal from "../hooks/useConfirmModal";
import "../assets/css/cart.css";
import QuantityControl from "../components/QuantityControl";
import { crearPedido, formatearItemsPedido } from "../services/orderService";

export default function CartPage() {
  const navigate = useNavigate();
  const { isAuthenticated, token } = useAuth();
  const {
    carrito,
    actualizarCantidad,
    eliminarDelCarrito,
    vaciarCarrito,
    calcularTotal,
  } = useCart();

  const [isProcessing, setIsProcessing] = useState(false);
  const {
    isOpen: isModalOpen,
    modalConfig,
    openModal,
    closeModal,
    handleConfirm,
  } = useConfirmModal();

  const total = calcularTotal();
  const cantidadTotal = carrito.reduce(
    (sum, item) => sum + (item.cantidad || 1),
    0
  );

  const handleFinalizarCompra = async () => {
    if (!isAuthenticated || !token) {
      Swal.fire({
        title: "Advertencia",
        text: "Debes iniciar sesión para finalizar la compra",
        icon: "warning",
        iconColor: "#d4a437",
        background: "#fff",
        color: "#333",
        customClass: {
          container: "add-prod-modal-overlay",
          popup: "add-prod-modal",
          confirmButton: "btn-primary",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { from: { pathname: "/carrito" } } });
        }
      });
      return;
    }

    if (carrito.length === 0) {
      return;
    }

    openModal({
      title: "Confirmar Pedido",
      message: `¿Deseas confirmar tu pedido de ${cantidadTotal} ${
        cantidadTotal === 1 ? "producto" : "productos"
      } por un total de ${formatPrice(total)}?`,
      confirmText: "Confirmar",
      cancelText: "Cancelar",
      danger: false,
      secondDanger: true,
      onConfirm: procesarPedido,
    });
  };

  const procesarPedido = async () => {
    setIsProcessing(true);

    try {
      const items = formatearItemsPedido(carrito);

      const orderData = {
        total,
        items,
      };

      const result = await crearPedido(orderData, token);

      await vaciarCarrito();

      Swal.fire({
        title: "¡Pedido realizado!",
        text: `Tu pedido ha sido confirmado exitosamente.`,
        icon: "success",
        iconColor: "var(--acento-secundario-color)",
        background: "#fff",
        color: "#333",
        customClass: {
          container: "add-prod-modal-overlay",
          popup: "add-prod-modal",
          confirmButton: "btn-primary",
        },
      });
    } catch (error) {
      console.error("Error al procesar pedido:", error);

      let errorMessage = "No se pudo procesar tu pedido. Intenta nuevamente.";

      if (error.message.includes("Token")) {
        errorMessage =
          "Tu sesión ha expirado. Por favor, inicia sesión nuevamente.";
      } else if (error.message.includes("productos")) {
        errorMessage = error.message;
      } else if (
        error.message.includes("red") ||
        error.message.includes("fetch")
      ) {
        errorMessage =
          "Error de conexión. Verifica tu internet e intenta nuevamente.";
      }

      Swal.fire({
        title: "Error al procesar pedido",
        text: errorMessage,
        icon: "error",
        iconColor: "#c95a5a",
        background: "#fff",
        color: "#333",
        customClass: {
          container: "add-prod-modal-overlay",
          popup: "add-prod-modal",
          confirmButton: "btn-primary",
        },
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
    }).format(price);
  };

  if (carrito.length === 0) {
    return (
      <>
        <Banner titulo="TU CARRITO" ariaLabel="banner-carrito" />
        <main className="cart-page-container" role="main" data-bg="light">
          <EmptyView
            icon={
              <svg
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="empty-cart-icon"
              >
                <path d="M7 4h-2l-1 2h2l1-2zm0 0" fill="currentColor" />
                <path
                  d="M7 4h10l-1.2 6.3A3 3 0 0 1 12.9 13H9.1a3 3 0 0 1-3-2.7L4.9 4H7z"
                  fill="currentColor"
                />
                <circle cx="10.5" cy="18.5" r="1.5" fill="currentColor" />
                <circle cx="17.5" cy="18.5" r="1.5" fill="currentColor" />
              </svg>
            }
            title={"Tu carrito está vacío"}
            message={"Agrega productos para comenzar tu compra"}
            btnText={"Ver Productos"}
            handleOnClick={() => {
              navigate("/productos");
            }}
          />
        </main>
      </>
    );
  }

  return (
    <>
      <Banner titulo="TU CARRITO" ariaLabel="banner-carrito" />

      <main className="cart-page-container" role="main" data-bg="light">
        <div className="cart-content-wrapper">
          {/* Listado de productos */}
          <section className="cart-items-section">
            <div className="cart-items-header">
              <h2>PRODUCTOS</h2>
              <button
                className="btn-secondary btn-secondary-wide btn-danger btn-clear-cart"
                onClick={vaciarCarrito}
                title="Vaciar carrito"
              >
                Vaciar carrito
              </button>
            </div>

            <div className="basic-flex-list cart-items-list">
              {carrito.map((producto) => {
                const cantidad = producto.cantidad || 1;
                const subtotal = (producto.precio || 0) * cantidad;

                return (
                  <article key={producto.id} className="cart-item-card">
                    <div className="cart-item-image-wrapper">
                      <img
                        src={producto.imagen}
                        alt={producto.nombre}
                        className="cart-item-image"
                      />
                    </div>

                    <div className="cart-item-details">
                      <h3 className="cart-item-name">{producto.nombre}</h3>
                      <p className="cart-item-description">
                        {producto.descripcion}
                      </p>
                      {/*Boton cantidad*/}
                      <QuantityControl
                        productoId={producto.id}
                        cantidad={producto.cantidad}
                        actualizarCantidad={actualizarCantidad}
                      />
                    </div>

                    <div className="cart-item-actions">
                      <button
                        className="confirm-modal-close"
                        onClick={() => eliminarDelCarrito(producto.id)}
                        aria-label={`Eliminar ${producto.nombre}`}
                      >
                        ×
                      </button>
                      <div className="cart-item-subtotal">
                        <span className="subtotal-label">Subtotal:</span>
                        <span className="subtotal-value">
                          {formatPrice(subtotal)}
                        </span>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          {/* Resumen del pedido */}
          <aside className="order-summary-sidebar">
            <div className="order-summary-sticky">
              <div className="order-summary-card">
                <h3 className="order-summary-title underlined-title">
                  RESUMEN
                </h3>

                <div className="order-summary-details">
                  <div className="summary-row">
                    <span className="summary-label">Productos</span>
                    <span className="summary-value">{cantidadTotal}</span>
                  </div>

                  <div className="summary-row">
                    <span className="summary-label">Subtotal</span>
                    <span className="summary-value">{formatPrice(total)}</span>
                  </div>

                  <div className="summary-row">
                    <span className="summary-label">Envío</span>
                    <span className="summary-value summary-value-secondary">
                      A calcular
                    </span>
                  </div>

                  <div className="summary-row summary-total">
                    <span className="summary-label">Total</span>
                    <span className="summary-value">{formatPrice(total)}</span>
                  </div>
                </div>

                <button
                  className="btn-primary btn-checkout"
                  onClick={handleFinalizarCompra}
                  disabled={isProcessing || carrito.length === 0}
                >
                  {isProcessing ? "Procesando..." : "Finalizar compra"}
                </button>

                <button
                  className="btn-secondary btn-continue"
                  onClick={() => navigate("/productos")}
                >
                  Seguir comprando
                </button>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <ConfirmModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={handleConfirm}
        title={modalConfig.title}
        message={modalConfig.message}
        confirmText={modalConfig.confirmText}
        cancelText={modalConfig.cancelText}
        danger={modalConfig.danger}
        secondDanger={modalConfig.secondDanger}
      />
    </>
  );
}
