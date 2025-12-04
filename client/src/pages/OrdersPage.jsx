import React from "react";
import { useNavigate } from "react-router-dom";
import Banner from "../components/Banner";
import Loader from "../components/Loader";
import EmptyView from "../components/EmptyView";
import useOrders from "../hooks/useOrders";
import "../assets/css/orders.css";

export default function OrdersPage() {
  const navigate = useNavigate();
  const { pedidos, loading, error, estadisticas } = useOrders();

  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
    }).format(price);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-AR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <>
        <Banner titulo="MIS PEDIDOS" ariaLabel="banner-pedidos" />
        <main className="orders-page-container" role="main" data-bg="light">
          <div className="loading-container">
            <Loader text="Cargando pedidos..."></Loader>
          </div>
        </main>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Banner titulo="MIS PEDIDOS" ariaLabel="banner-pedidos" />
        <main className="orders-page-container" role="main" data-bg="light">
          <div className="error-container">
            <p className="error-message">{error}</p>
            <button className="btn-primary" onClick={() => navigate("/")}>
              Volver al inicio
            </button>
          </div>
        </main>
      </>
    );
  }

  if (pedidos.length === 0) {
    return (
      <>
        <Banner titulo="MIS PEDIDOS" ariaLabel="banner-pedidos" />
        <main className="orders-page-container" role="main" data-bg="light">
          <EmptyView
            icon={
              <svg
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="empty-orders-icon"
              >
                <path
                  d="M12 2L2 7v10c0 5.55 3.84 10.74 10 12 6.16-1.26 10-6.45 10-12V7l-10-5z"
                  fill="currentColor"
                  opacity="0.3"
                />
              </svg>
            }
            title={"Aún no tenes pedidos"}
            message={"Explora nuestro catálogo y realiza tu primera compra"}
            btnText={"Ver Productos"}
            handleOnClick={() => {
              navigate("/productos");
            }}
          ></EmptyView>
        </main>
      </>
    );
  }

  return (
    <>
      <Banner titulo="MIS PEDIDOS" ariaLabel="banner-pedidos" />

      <main
        className="basic-main-container orders-page-container"
        role="main"
        data-bg="light"
      >
        <section className="orders-stats">
          <div className="custom-li">
            <strong>Total de Pedidos:</strong>
            <span>{estadisticas.total}</span>
          </div>
          <div className="custom-li">
            <strong>Total Gastado:</strong>
            <span>{formatPrice(estadisticas.totalGastado)}</span>
          </div>
        </section>

        <section className="orders-list-section">
          <h2 className="underlined-title">HISTORIAL DE PEDIDOS</h2>

          <div className="basic-flex-list orders-list">
            {pedidos.map((pedido) => (
              <article key={pedido._id} className="order-card">
                <div className="order-header">
                  <div className="order-id">
                    <strong>Pedido #{pedido._id.slice(-8)}</strong>
                  </div>
                  <div className="order-date">
                    {formatDate(pedido.createdAt)}
                  </div>
                </div>

                <div className="order-items">
                  {pedido.items.map((item, index) => (
                    <div key={index} className="order-item">
                      <span className="item-name">
                        {item.name} x {item.quantity}
                      </span>
                      <span className="item-price">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="order-footer">
                  <div className="order-total">
                    <span className="total-label">Total:</span>
                    <span className="total-value">
                      {formatPrice(pedido.total)}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <div className="orders-actions">
          <button
            className="btn-secondary btn-secondary-wide"
            onClick={() => navigate("/productos")}
          >
            Seguir Comprando
          </button>
          <button
            className="btn-secondary btn-secondary-wide"
            onClick={() => navigate("/perfil")}
          >
            Volver a Mi Perfil
          </button>
        </div>
      </main>
    </>
  );
}
