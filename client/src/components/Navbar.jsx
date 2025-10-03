import React, { useState, useEffect } from 'react';
import '../assets/css/header.css';
import logo from '../assets/logo.svg';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [lightSection, setLightSection] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // 👇 ejemplo: si scrolleaste más de 50px, cambiamos el estilo
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
            <button id="btn-ver-carrito" title="Ver carrito">
              {/* svg igual que antes */}
              <span id="contador-carrito" className="badge">0</span>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
