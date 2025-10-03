import React, {useState, useEffect, useCallback} from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import './assets/css/styles.css';

export default function App() {
  const [pagina, setPagina] = useState("home"); // estado que controla qué renderizar

   // Determina página inicial según la URL
  useEffect(() => {
    const path = window.location.pathname;
    if (path === '/productos' || path === '/productos/') {
      setPagina('catalog');
    } else {
      setPagina('home');
    }
  }, []);

  const navigate = useCallback((next) => {
    setPagina(next);
    const url = next === 'catalog' ? '/productos' : '/';
    window.history.pushState({ pagina: next }, '', url);
  }, []);

  // Maneja navegación con botones atrás/adelante
  useEffect(() => {
    const handler = (e) => {
      const path = window.location.pathname;
      if (path.startsWith('/productos')) {
        setPagina('catalog');
      } else {
        setPagina('home');
      }
    };
    window.addEventListener('popstate', handler);
    return () => window.removeEventListener('popstate', handler);
  }, []);

  // Intercepta clicks en enlaces internos a / y /productos sin recargar
  useEffect(() => {
    const onClick = (e) => {
      const anchor = e.target.closest('a');
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (href === '/' || href === '/productos') {
        e.preventDefault();
        navigate(href === '/productos' ? 'catalog' : 'home');
      }
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [navigate]);

  return (
    <>
      <Navbar onNavigate={navigate} cartCount={0} />
      {pagina === 'home' && <Home onVerProductos={() => navigate('catalog')} />}
      {pagina === 'catalog' && <Catalog onBack={() => navigate('home')} />}
      <Footer />
    </>
  );
}
