import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import Banner from "../components/Banner";
import "../assets/css/cart.css";
import QuantityControl from "../components/QuantityControl";

export default function CartPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const {
    carrito,
    actualizarCantidad,
    eliminarDelCarrito,
    vaciarCarrito,
    calcularTotal,
  } = useCart();

  const total = calcularTotal();
  const cantidadTotal = carrito.reduce(
    (sum, item) => sum + (item.cantidad || 1),
    0
  );

  const handleFinalizarCompra = () => {
    if (!isAuthenticated) {
      alert("Debes iniciar sesión para finalizar la compra");
      navigate("/login", { state: { from: { pathname: "/carrito" } } });
      return;
    }

    alert(
      "Funcionalidad de pedidos próximamente. Por ahora, tu carrito se vaciará."
    );
    vaciarCarrito();
    navigate("/");
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
          <div className="empty-cart">
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
            <h2>Tu carrito está vacío</h2>
            <p>Agrega productos para comenzar tu compra</p>
            <button
              className="btn-primary"
              onClick={() => navigate("/productos")}
            >
              Explorar Productos
            </button>
          </div>
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
              <h2>Productos</h2>
              <button
                className="btn-secondary btn-danger"
                onClick={vaciarCarrito}
                title="Vaciar carrito"
              >
                Vaciar carrito
              </button>
            </div>

            <div className="cart-items-list">
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
                <h3 className="order-summary-title">Resumen del pedido</h3>

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
                >
                  Finalizar compra
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
    </>
  );
}
