import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import Banner from "../components/Banner";
import "../assets/css/productos.css";
import "../assets/css/cart.css";

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

  const handleFinalizarCompra = () => {
    if (!isAuthenticated) {
      // Si no está autenticado, redirigir al login
      alert("Debes iniciar sesión para finalizar la compra");
      navigate("/login", { state: { from: { pathname: "/carrito" } } });
      return;
    }

    // TODO: Implementar creación de pedido en el backend
    alert(
      "Funcionalidad de pedidos próximamente. Por ahora, tu carrito se vaciará."
    );
    vaciarCarrito();
    navigate("/");
  };

  return (
    <>
      <Banner titulo="TU CARRITO" ariaLabel="banner-carrito" />

      <main className="tight-container" role="main" data-bg="light">
        <div className="carrito-raiz">
          {carrito.length === 0 ? (
            <div style={{ textAlign: "center", padding: "3rem 0" }}>
              <p style={{ fontSize: "1.2rem", marginBottom: "1.5rem" }}>
                Tu carrito está vacío
              </p>
              <button
                className="btn-primary"
                onClick={() => navigate("/productos")}
              >
                Ver Productos
              </button>
            </div>
          ) : (
            <>
              <ul className="carrito-lista">
                {carrito.map((producto) => {
                  const cantidad = producto.cantidad || 1;
                  const subtotal = (producto.precio || 0) * cantidad;
                  const priceFormatted = new Intl.NumberFormat("es-AR", {
                    style: "currency",
                    currency: "ARS",
                  }).format(producto.precio);
                  const subtotalFormatted = new Intl.NumberFormat("es-AR", {
                    style: "currency",
                    currency: "ARS",
                  }).format(subtotal);

                  return (
                    <li key={producto.id} className="carrito-item">
                      <img
                        className="carrito-item-miniatura"
                        src={producto.imagen}
                        alt={producto.nombre}
                      />
                      <div className="carrito-item-cuerpo">
                        <div className="carrito-item-fila">
                          <strong>{producto.nombre}</strong>
                          <span className="carrito-item-precio">
                            {priceFormatted}
                          </span>
                        </div>
                        <p className="carrito-item-descripcion">
                          {producto.descripcion}
                        </p>
                        <div className="carrito-item-controles">
                          <input
                            className="carrito-item-cantidad"
                            type="number"
                            min="1"
                            max="99"
                            value={cantidad}
                            onChange={(e) =>
                              actualizarCantidad(
                                producto.id,
                                Number(e.target.value)
                              )
                            }
                          />
                          <button
                            className="btn-secondary"
                            onClick={() => eliminarDelCarrito(producto.id)}
                          >
                            Eliminar
                          </button>
                          <div className="carrito-item-subtotal">
                            Subtotal: {subtotalFormatted}
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>

              <footer className="carrito-footer">
                <div>
                  <p style={{ margin: 0, fontSize: "1.3rem", fontWeight: 700 }}>
                    Total:{" "}
                    {new Intl.NumberFormat("es-AR", {
                      style: "currency",
                      currency: "ARS",
                    }).format(total)}
                  </p>
                </div>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button
                    className="btn-primary"
                    onClick={handleFinalizarCompra}
                  >
                    Finalizar compra
                  </button>
                  <button
                    className="btn-secondary"
                    onClick={() => navigate("/productos")}
                  >
                    Seguir comprando
                  </button>
                </div>
              </footer>
            </>
          )}
        </div>
      </main>
    </>
  );
}
