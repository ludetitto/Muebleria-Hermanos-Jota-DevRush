import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import Dropdown from "./Dropdown";
import ConfirmModal from "./ConfirmModal";
import useConfirmModal from "../hooks/useConfirmModal";
import "../assets/css/header.css";
import logo from "../assets/logo.svg";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [lightSection, setLightSection] = useState(false);
  const { isAuthenticated, logout, user } = useAuth();
  const headerRef = useRef(null);
  const {
    isOpen: isModalOpen,
    modalConfig,
    openModal,
    closeModal,
    handleConfirm,
  } = useConfirmModal();

  const navigate = useNavigate();
  const location = useLocation();

  const { contadorCarrito } = useCart();

  // Detectar color de sección para cambiar color de links
  useEffect(() => {
    const updateHeaderLinksColor = () => {
      if (window.innerWidth > 768) {
        const header = headerRef.current;
        if (!header) return;

        const sections = document.querySelectorAll("[data-bg]");
        const headerHeight = header.offsetHeight;
        let currentSection = null;

        sections.forEach((section) => {
          const rect = section.getBoundingClientRect();
          if (rect.top <= headerHeight && rect.bottom >= 0) {
            currentSection = section;
          }
        });

        if (currentSection) {
          const bgType = currentSection.getAttribute("data-bg");
          setLightSection(bgType === "light");
        }
      }
    };

    updateHeaderLinksColor();
    window.addEventListener("scroll", updateHeaderLinksColor);
    window.addEventListener("resize", updateHeaderLinksColor);

    return () => {
      window.removeEventListener("scroll", updateHeaderLinksColor);
      window.removeEventListener("resize", updateHeaderLinksColor);
    };
  }, [location.pathname]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleLogout = () => {
    // Abrir modal de confirmación
    openModal({
      title: "Cerrar Sesión",
      message: "¿Estás seguro que deseas cerrar sesión?",
      confirmText: "Sí, cerrar sesión",
      cancelText: "Cancelar",
      danger: true,
      onConfirm: () => {
        logout();
        navigate("/");
        closeMenu();
      },
    });
  };

  return (
    <header ref={headerRef} className={lightSection ? "on-light-section" : ""}>
      <nav>
        <div className="top-bar">
          {/* Hamburger menu (móvil) */}
          <div className="hamburger" onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>

          {/* Logo responsive (móvil) */}
          <Link to="/" onClick={closeMenu}>
            <img
              src={logo}
              alt="Logo Hermanos Jota"
              className="logo logo-responsive"
            />
          </Link>

          {/* Contenedor de navegación */}
          <div className={`nav-container ${menuOpen ? "active" : ""}`}>
            <ul className="nav-links">
              {/* Logo (desktop) */}
              <img src={logo} alt="Logo Hermanos Jota" className="logo" />

              {/* Links principales - SIEMPRE VISIBLES */}
              <li>
                <Link to="/" onClick={closeMenu}>
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/productos" onClick={closeMenu}>
                  Productos
                </Link>
              </li>
              <li>
                <Link to="/nosotros" onClick={closeMenu}>
                  Nosotros
                </Link>
              </li>
              <li>
                <Link to="/contacto" onClick={closeMenu}>
                  Contacto
                </Link>
              </li>
              {isAuthenticated && user && user.role === "admin" && (
                <li>
                  <Link to="/admin/crear-producto">Crear Producto</Link>
                </li>
              )}
              {isAuthenticated && (
                <li>
                  <Link to="/perfil" className="responsive-link">
                    Mi perfil
                  </Link>
                </li>
              )}
              <li className="responsive-link">
                <Link to="/login" onClick={closeMenu}>
                  Login
                </Link>
              </li>
              <li className="responsive-link">
                <Link to="/registro" onClick={closeMenu}>
                  Registrarse
                </Link>
              </li>
              {isAuthenticated && (
                <>
                  <li className="responsive-link">
                    <Link to="/perfil">Mi perfil</Link>
                  </li>
                  <li className="responsive-link">
                    <Link onClick={handleLogout}>Cerrar sesión</Link>
                  </li>
                </>
              )}
            </ul>
          </div>

          <div className="header-icons">
            {/* Icono de usuario con dropdown */}
            <Dropdown />

            <div className="cart-container">
              <Link to="/carrito" onClick={closeMenu}>
                <button
                  className="link-icon"
                  title="Ver carrito"
                  aria-label="Ver carrito de compras"
                >
                  <svg
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path d="M7 4h-2l-1 2h2l1-2zm0 0" fill="currentColor" />
                    <path
                      d="M7 4h10l-1.2 6.3A3 3 0 0 1 12.9 13H9.1a3 3 0 0 1-3-2.7L4.9 4H7z"
                      fill="currentColor"
                    />
                    <circle cx="10.5" cy="18.5" r="1.5" fill="currentColor" />
                    <circle cx="17.5" cy="18.5" r="1.5" fill="currentColor" />
                  </svg>
                  {contadorCarrito > 0 && (
                    <span id="contador-carrito" className="badge">
                      {contadorCarrito}
                    </span>
                  )}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <ConfirmModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={handleConfirm}
        title={modalConfig.title}
        message={modalConfig.message}
        confirmText={modalConfig.confirmText}
        cancelText={modalConfig.cancelText}
        danger={modalConfig.danger}
      />
    </header>
  );
}
