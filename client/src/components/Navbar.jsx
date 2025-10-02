import React, { useState } from 'react';
import './Navbar.css';
import logo from '../assets/logo.svg';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={menuOpen ? 'on-light-section' : ''}>
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
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#D4A437" viewBox="0 0 24 24">
                <path d="M7 18c-1.104 0-2 .896-2 2s.896 2 2 2 2-.896 2-2-.896-2-2-2zm10 0c-1.104 0-2 .896-2 2s.896 2 2 2 2-.896 2-2-.896-2-2-2zm1.447-2.105l1.553-9.895h-17v2h2l3.6 7.59-1.35 2.44c-.16.28-.25.61-.25.96 0 1.104.896 2 2 2h12v-2h-11.42c-.14 0-.25-.11-.25-.25s.11-.25.25-.25h11.42c.14 0 .25-.11.25-.25s-.11-.25-.25-.25h-11.42c-.14 0-.25-.11-.25-.25s.11-.25.25-.25h11.42c.14 0 .25-.11.25-.25s-.11-.25-.25-.25h-11.42c-.14 0-.25-.11-.25-.25s.11-.25.25-.25h11.42c.14 0 .25-.11.25-.25s-.11-.25-.25-.25h-11.42c-.14 0-.25-.11-.25-.25s.11-.25.25-.25h11.42c.14 0 .25-.11.25-.25s-.11-.25-.25-.25h-11.42c-.14 0-.25-.11-.25-.25s.11-.25.25-.25h11.42c.14 0 .25-.11.25-.25s-.11-.25-.25-.25h-11.42c-.14 0-.25-.11-.25-.25s.11-.25.25-.25h11.42c.14 0 .25-.11.25-.25s-.11-.25-.25-.25h-11.42c-.14 0-.25-.11-.25-.25s.11-.25.25-.25h11.42c.14 0 .25-.11.25-.25s-.11-.25-.25-.25z"></path>
              </svg>
              <span id="contador-carrito" className="badge">0</span>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
