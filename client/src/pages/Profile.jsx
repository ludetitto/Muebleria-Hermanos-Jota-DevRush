import React from "react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import Banner from "../components/Banner";
import ConfirmModal from "../components/ConfirmModal";
import useConfirmModal from "../hooks/useConfirmModal";
import "../assets/css/profile.css";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { user, logout } = useAuth();
  const { contadorCarrito } = useCart();
  const { isOpen, modalConfig, openModal, closeModal, handleConfirm } =
    useConfirmModal();

  const navigate = useNavigate();

  const handleLogout = () => {
    openModal({
      title: "Cerrar Sesión",
      message: "¿Estás seguro que deseas cerrar sesión?",
      confirmText: "Sí, cerrar sesión",
      cancelText: "Cancelar",
      danger: true,
      onConfirm: () => {
        logout();
        navigate("/");
      },
    });
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

        <ConfirmModal
          isOpen={isOpen}
          onClose={closeModal}
          onConfirm={handleConfirm}
          title={modalConfig.title}
          message={modalConfig.message}
          confirmText={modalConfig.confirmText}
          cancelText={modalConfig.cancelText}
          danger={modalConfig.danger}
        />
      </main>
    </>
  );
}
