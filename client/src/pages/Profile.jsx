import React from "react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import Banner from "../components/Banner";
import "../assets/css/profile.css";

export default function Profile() {
  const { user, logout } = useAuth();
  const { carrito, contadorCarrito } = useCart();

  const handleLogout = () => {
    if (window.confirm("¿Estás seguro que deseas cerrar sesión?")) {
      logout();
    }
  };

  return (
    <>
      <Banner titulo="MI PERFIL" ariaLabel="banner-perfil" />

      <main
        className="tight-container profile-container"
        role="main"
        data-bg="light"
      >
        <section className="profile-info">
          <h2>Información de la cuenta</h2>
          <div className="info-grid">
            <div className="info-item">
              <strong>Nombre:</strong>
              <span>{user?.nombre}</span>
            </div>
            <div className="info-item">
              <strong>Email:</strong>
              <span>{user?.email}</span>
            </div>
            <div className="info-item">
              <strong>Miembro desde:</strong>
              <span>
                {user?.createdAt
                  ? new Date(user.createdAt).toLocaleDateString("es-AR")
                  : "Fecha no disponible"}
              </span>
            </div>
          </div>
        </section>

        <section className="profile-stats">
          <h2>Estadísticas</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">{contadorCarrito}</div>
              <div className="stat-label">Productos en carrito</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">0</div>
              <div className="stat-label">Pedidos realizados</div>
            </div>
          </div>
        </section>

        <section className="profile-actions">
          <button className="btn-secondary" onClick={handleLogout}>
            Cerrar Sesión
          </button>
        </section>
      </main>
    </>
  );
}
