import React, { useState, useEffect } from 'react';
import '../assets/css/header.css';
import logo from '../assets/logo.svg';

export default function Navbar({ cartCount = 0, onNavigate, onOpenCart }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [lightSection, setLightSection] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setLightSection(false);
      } else {
        setLightSection(true);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={lightSection ? "on-light-section" : ""}>
      <nav>
        <div className="top-bar">
          <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            <span></span>
            <span></span>
            <span></span>
          </div>

          <img src={logo} alt="Logo Hermanos Jota" className="logo logo-responsive" />

          <div className={`nav-container ${menuOpen ? 'active' : ''}`}>
            <ul className="nav-links">
              <img src={logo} alt="Logo Hermanos Jota" className="logo" />
              <li><a href="/">Inicio</a></li>
              <li><a href="/productos">Productos</a></li>
              <li><a href="/nosotros">Nosotros</a></li>
              <li><a href="/contacto">Contacto</a></li>
            </ul>
          </div>

          <div className="cart-container">
            <button id="btn-ver-carrito" title="Ver carrito" onClick={() => (typeof onOpenCart === 'function' ? onOpenCart() : (onNavigate && onNavigate('cart')))}>
              {/* carrito SVG */}
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                <path d="M7 4h-2l-1 2h2l1-2zm0 0" fill="currentColor" />
                <path d="M7 4h10l-1.2 6.3A3 3 0 0 1 12.9 13H9.1a3 3 0 0 1-3-2.7L4.9 4H7z" fill="currentColor" />
                <circle cx="10.5" cy="18.5" r="1.5" fill="currentColor" />
                <circle cx="17.5" cy="18.5" r="1.5" fill="currentColor" />
              </svg>
              <span id="contador-carrito" className="badge">{cartCount}</span>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
