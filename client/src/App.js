import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import ProductDetailPage from './pages/ProductDetailPage';
import './assets/css/styles.css';

export default function App() {
  const [pagina, setPagina] = useState("home"); // home | catalog | detalle
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  // Determina página inicial según la URL
  useEffect(() => {
    const path = window.location.pathname;
    if (path === '/productos' || path === '/productos/') {
      setPagina('catalog');
    } else if (path.startsWith('/productos/')) {
      // caso detalle directo con /productos/:id
      const id = path.split('/')[2];
      setProductoSeleccionado({ id, nombre: "Producto " + id, descripcion: "Detalle del producto", precio: 100, imagen: "/images/silla.jpg" });
      setPagina('detalle');
    } else {
      setPagina('home');
    }
  }, []);

  const navigate = useCallback((next, producto = null) => {
    setPagina(next);
    if (next === 'detalle' && producto) {
      setProductoSeleccionado(producto);
      window.history.pushState({ pagina: 'detalle' }, '', `/productos/${producto.id}`);
    } else if (next === 'catalog') {
      window.history.pushState({ pagina: 'catalog' }, '', '/productos');
    } else {
      window.history.pushState({ pagina: 'home' }, '', '/');
    }
  }, []);

  // Maneja navegación con botones atrás/adelante
  useEffect(() => {
    const handler = () => {
      const path = window.location.pathname;
      if (path === '/' || path === '') {
        setPagina('home');
      } else if (path.startsWith('/productos/')) {
        const id = path.split('/')[2];
        setProductoSeleccionado({ id, nombre: "Producto " + id, descripcion: "Detalle del producto", precio: 100, imagen: "/images/silla.jpg" });
        setPagina('detalle');
      } else if (path.startsWith('/productos')) {
        setPagina('catalog');
      }
    };
    window.addEventListener('popstate', handler);
    return () => window.removeEventListener('popstate', handler);
  }, []);

  // Intercepta clicks en enlaces internos
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

      {pagina === 'catalog' && (
        <Catalog
          onBack={() => navigate('home')}
          onSelectProducto={(p) => navigate('detalle', p)} // 👈 nuevo callback
        />
      )}

      {pagina === 'detalle' && (
        <ProductDetailPage
          producto={productoSeleccionado}
          onBack={() => navigate('catalog')}
        />
      )}

      <Footer />
    </>
  );
}
