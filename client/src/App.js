import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import ProductDetailPage from './pages/ProductDetailPage';
import Cart from './components/Cart';
import './assets/css/styles.css';

export default function App() {
  const [pagina, setPagina] = useState("home");
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [cart, setCart] = useState([]);
  const [showCartModal, setShowCartModal] = useState(false);

  // Cargar carrito desde localStorage al iniciar
  useEffect(() => {
    try {
      // Si existe la clave antigua, migrarla
      const legacy = localStorage.getItem('carrito_almacenado');
      if (legacy) {
        try {
          const parsedLegacy = JSON.parse(legacy);
          if (Array.isArray(parsedLegacy)) {
            localStorage.setItem('hj_cart', JSON.stringify(parsedLegacy));
            setCart(parsedLegacy);
            return;
          }
        } catch (e) {
        }
      }

      const raw = localStorage.getItem('hj_cart');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setCart(parsed);
      }
    } catch (e) {
      console.warn('No se pudo leer carrito desde localStorage', e);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('hj_cart', JSON.stringify(cart));
    } catch (e) {
      console.warn('No se pudo guardar carrito en localStorage', e);
    }
  }, [cart]);

  useEffect(() => {
    const path = window.location.pathname;
    if (path === '/productos' || path === '/productos/') {
      setPagina('catalog');
    } else if (path.startsWith('/productos/')) {
      const id = path.split('/')[2];
      setProductoSeleccionado({ id, nombre: "Producto " + id, descripcion: "Detalle del producto", precio: 100, imagen: "/images/silla.jpg" });
      setPagina('detalle');
    } else if (path === '/contacto' || path === '/contact') {
      setPagina('contact');
    } else if (path === '/nosotros' || path === '/about') {
      setPagina('about');
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

  const addToCart = useCallback((producto, quantity = 1) => {
    console.log('App: addToCart called', { producto, quantity });
    setCart((prev) => {
      const idx = prev.findIndex((p) => String(p.id) === String(producto.id));
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], quantity: (copy[idx].quantity || 1) + quantity };
        return copy;
      }
      return [...prev, { ...producto, quantity }];
    });
  }, []);

  const updateQuantity = useCallback((productId, quantity) => {
    setCart((prev) => prev.map((p) => (String(p.id) === String(productId) ? { ...p, quantity } : p)));
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCart((prev) => prev.filter((p) => String(p.id) !== String(productId)));
  }, []);

  const checkout = useCallback(() => {
    console.log('Checkout', cart);
    setCart([]);
    alert('Gracias por tu compra (simulada).');
  }, [cart]);

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

  const openCartModal = useCallback(() => setShowCartModal(true), []);
  const closeCartModal = useCallback(() => setShowCartModal(false), []);

  useEffect(() => {
    const onClick = (e) => {
      const anchor = e.target.closest('a');
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (!href) return;

      const path = href.replace(window.location.origin, '');
      if (path === '/' || path === '/productos' || path === '/contacto' || path === '/nosotros' || path.startsWith('/productos/')) {
        e.preventDefault();
        if (path === '/' ) return navigate('home');
        if (path === '/productos') return navigate('catalog');
        if (path === '/contacto' || path === '/contact') return navigate('contact');
        if (path === '/nosotros' || path === '/about') return navigate('about');
        if (path.startsWith('/productos/')) {
          const id = path.split('/')[2];
          navigate('detalle', { id });
        }
      }
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [navigate]);

  return (
    <>
      <Navbar onNavigate={navigate} onOpenCart={openCartModal} cartCount={cart.reduce((s, p) => s + (p.quantity || 1), 0)} />

      {pagina === 'home' && <Home onVerProductos={() => navigate('catalog')} />}

      {pagina === 'catalog' && (
        <Catalog
          onBack={() => navigate('home')}
          onSelectProducto={(p) => navigate('detalle', p)}
          onAddToCart={(producto, cantidad) => addToCart(producto, cantidad)}
        />
      )}

      {pagina === 'cart' && (
        <Cart
          cart={cart}
          onUpdateQuantity={updateQuantity}
          onRemove={removeFromCart}
          onCheckout={checkout}
          onBack={() => navigate('catalog')}
        />
      )}

      {pagina === 'detalle' && (
        <ProductDetailPage
          producto={productoSeleccionado}
          onBack={() => navigate('catalog')}
          onAddToCart={(producto, cantidad) => addToCart(producto, cantidad)}
        />
      )}

      {showCartModal && (
        <div className="modal-fondo" onClick={closeCartModal}>
          <div className="modal-contenido show" onClick={(e) => e.stopPropagation()}>
            <button className="cerrar" onClick={closeCartModal} aria-label="Cerrar modal">×</button>
            <Cart
              cart={cart}
              onUpdateQuantity={updateQuantity}
              onRemove={removeFromCart}
              onCheckout={() => { checkout(); closeCartModal(); }}
              onBack={closeCartModal}
            />
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
