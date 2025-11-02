import React, { useState, useEffect, useRef } from "react";
import "../assets/css/header.css";
import logo from "../assets/logo.svg";

export default function Navbar({ contadorCarrito = 0, onNavegar, onAbrirCarrito }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [lightSection, setLightSection] = useState(false);
  const headerRef = useRef(null);

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
          // Si el header se está interponiendo con una sección
          if (rect.top <= headerHeight && rect.bottom >= 0) {
            currentSection = section;
          }
        });

        if (currentSection) {
          const bgType = currentSection.getAttribute("data-bg");
          if (bgType === "light") {
            setLightSection(true);
          } else {
            setLightSection(false);
          }
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
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header ref={headerRef} className={lightSection ? "on-light-section" : ""}>
      <nav>
        <div className="top-bar">
          <div className="hamburger" onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>

          <img
            src={logo}
            alt="Logo Hermanos Jota"
            className="logo logo-responsive"
          />

          <div className={`nav-container ${menuOpen ? "active" : ""}`}>
            <ul className="nav-links">
              <img src={logo} alt="Logo Hermanos Jota" className="logo" />
              <li>
                <a href="/">Inicio</a>
              </li>
              <li>
                <a href="/productos">Catálogo</a>
              </li>
              <li>
                <a href="/admin/crear-producto">Crear Producto</a>
              </li>
              <li>
                <a href="/nosotros">Nosotros</a>
              </li>
              <li>
                <a href="/contacto">Contacto</a>
              </li>
            </ul>
          </div>

          <div className="cart-container">
            <button
              id="btn-ver-carrito"
              title="Ver carrito"
              onClick={() =>
                typeof onAbrirCarrito === "function"
                  ? onAbrirCarrito()
                  : onNavegar && onNavegar("cart")
              }
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
              <span id="contador-carrito" className="badge">
                {contadorCarrito}
              </span>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
