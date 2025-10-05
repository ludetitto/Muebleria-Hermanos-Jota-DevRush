import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import ProductDetailPage from './pages/ProductDetailPage';
import Cart from './components/Cart';
import About from './pages/About';
import Contact from './pages/Contact';
import './assets/css/styles.css';

export default function App() {
  const [pagina, setPagina] = useState("home");
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [carrito, setCarrito] = useState([]);
  const [mostrarCarritoModal, setMostrarCarritoModal] = useState(false);

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
            setCarrito(parsedLegacy);
            return;
          }
        } catch (e) {
        }
      }

      const raw = localStorage.getItem('hj_cart');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          const normalized = parsed.map((it) => {
            if (it == null || typeof it !== 'object') return it;
            if ('cantidad' in it) return it;
            if ('quantity' in it) {
              const copy = { ...it };
              copy.cantidad = Number(copy.quantity) || 1;
              delete copy.quantity;
              return copy;
            }
            return { ...it, cantidad: 1 };
          });
          setCarrito(normalized);
        }
      }
    } catch (e) {
      console.warn('No se pudo leer carrito desde localStorage', e);
    }
  }, []);

  useEffect(() => {
    try {
      const toStore = carrito.map((it) => {
        if (it == null || typeof it !== 'object') return it;
        const copy = { ...it };
        if ('quantity' in copy && !('cantidad' in copy)) {
          copy.cantidad = Number(copy.quantity) || 1;
          delete copy.quantity;
        }
        if (!('cantidad' in copy)) copy.cantidad = 1;
        return copy;
      });
      localStorage.setItem('hj_cart', JSON.stringify(toStore));
    } catch (e) {
      console.warn('No se pudo guardar carrito en localStorage', e);
    }
  }, [carrito]);

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

  const onNavegar = useCallback((next, producto = null) => {
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

  const agregarAlCarrito = useCallback((producto, cantidad = 1) => {
    console.log('App: agregarAlCarrito called', { producto, cantidad });
    setCarrito((prev) => {
      const idx = prev.findIndex((p) => String(p.id) === String(producto.id));
      if (idx >= 0) {
        const copy = [...prev];
        const existing = copy[idx];
        const existingCantidad = Number(existing.cantidad || existing.quantity || 1);
        copy[idx] = { ...existing, cantidad: existingCantidad + Number(cantidad) };
        delete copy[idx].quantity;
        return copy;
      }
      return [...prev, { ...producto, cantidad: Number(cantidad) }];
    });
  }, []);

  const actualizarCantidad = useCallback((productId, cantidad) => {
    setCarrito((prev) => prev.map((p) => (String(p.id) === String(productId) ? { ...p, cantidad } : p)));
  }, []);

  const eliminarDelCarrito = useCallback((productId) => {
    setCarrito((prev) => prev.filter((p) => String(p.id) !== String(productId)));
  }, []);

  const finalizarCompra = useCallback(() => {
    console.log('Finalizar compra', carrito);
    setCarrito([]);
    alert('Gracias por tu compra (simulada).');
  }, [carrito]);

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

  const abrirCarritoModal = useCallback(() => setMostrarCarritoModal(true), []);
  const cerrarCarritoModal = useCallback(() => setMostrarCarritoModal(false), []);

  useEffect(() => {
    const onClick = (e) => {
      const anchor = e.target.closest('a');
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (!href) return;

      const path = href.replace(window.location.origin, '');
      if (path === '/' || path === '/productos' || path === '/contacto' || path === '/nosotros' || path.startsWith('/productos/')) {
        e.preventDefault();
        if (path === '/' ) return onNavegar('home');
        if (path === '/productos') return onNavegar('catalog');
        if (path === '/contacto' || path === '/contact') return onNavegar('contact');
        if (path === '/nosotros' || path === '/about') return onNavegar('about');
        if (path.startsWith('/productos/')) {
          const id = path.split('/')[2];
          onNavegar('detalle', { id });
        }
      }
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [onNavegar]);

  return (
    <>
  <Navbar onNavegar={onNavegar} onAbrirCarrito={abrirCarritoModal} contadorCarrito={carrito.reduce((s, p) => s + (Number(p.cantidad || p.quantity) || 0), 0)} />

  {pagina === 'home' && <Home onVerProductos={() => onNavegar('catalog')} onSelectProducto={(p) => onNavegar('detalle', p)} />}

      {pagina === 'catalog' && (
        <Catalog
          onVolver={() => onNavegar('home')}
          onSelectProducto={(p) => onNavegar('detalle', p)}
          onAgregarAlCarrito={(producto, cantidad) => agregarAlCarrito(producto, cantidad)}
        />
      )}

      {pagina === 'cart' && (
        <Cart
          carrito={carrito}
          onActualizarCantidad={actualizarCantidad}
          onEliminar={eliminarDelCarrito}
          onFinalizarCompra={finalizarCompra}
          onVolver={() => onNavegar('catalog')}
        />
      )}

      {pagina === 'detalle' && (
        <ProductDetailPage
          producto={productoSeleccionado}
          onVolver={() => onNavegar('catalog')}
          onAgregarAlCarrito={(producto, cantidad) => agregarAlCarrito(producto, cantidad)}
        />
      )}

      {pagina === 'about' && (
        <About></About>
      )}
      {pagina === 'contact' && (
        <Contact></Contact>
      )}

      {mostrarCarritoModal && (
        <div className="modal-fondo" onClick={cerrarCarritoModal}>
          <div className="modal-contenido show" onClick={(e) => e.stopPropagation()}>
            <button className="cerrar" onClick={cerrarCarritoModal} aria-label="Cerrar modal">×</button>
            <Cart
              carrito={carrito}
              onActualizarCantidad={actualizarCantidad}
              onEliminar={eliminarDelCarrito}
              onFinalizarCompra={() => { finalizarCompra(); cerrarCarritoModal(); }}
              onVolver={cerrarCarritoModal}
            />
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
