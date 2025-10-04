import React, { useState, useMemo } from "react";
import ProductList from "../components/ProductList";
import ProductDetail from "../components/ProductDetail";
import products from "../data/products";

export default function Catalog({ onSelectProducto, onBack, onAddToCart }) {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  const productosFiltrados = useMemo(() =>
    products.filter(p => p.nombre.toLowerCase().includes(search.toLowerCase()))
  , [search]);

  return (
    <>
      {!selected ? (
        // Vista catálogo
        <main data-bg="light">
          <section className="banner" data-bg="dark">
            <h1 className="titulo-principal">CATÁLOGO DE PRODUCTOS</h1>
            <div className="form-group">
              <input
                type="text"
                id="searchInput"
                placeholder="🔍 Buscar productos..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </section>

          <section className="catalogo">
            <ProductList
              productos={productosFiltrados}
              onSelect={(prod) => (onSelectProducto ? onSelectProducto(prod) : setSelected(prod))} // cuando clickeas pasa a detalle
            />
          </section>
        </main>
      ) : (
        // Vista detalle
        <ProductDetail
          producto={selected}
          onClose={() => setSelected(null)} // vuelve al catálogo
          onAddToCart={onAddToCart}
        />
      )}
    </>
  );
}
