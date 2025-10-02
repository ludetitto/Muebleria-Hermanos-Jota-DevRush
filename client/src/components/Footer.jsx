import React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <footer>
      <p>&copy; 2025 Mueblería Hermanos Jota — Todos los derechos reservados.</p>
      <p>
        <a href="/contacto">Contacto</a> · <a href="/nosotros">Nosotros</a>
      </p>
      <p>
        Seguinos en
        <a href="https://www.instagram.com" target="_blank" rel="noreferrer"> Instagram </a>
        y
        <a href="https://www.facebook.com" target="_blank" rel="noreferrer"> Facebook </a>
      </p>
    </footer>
  );
}
