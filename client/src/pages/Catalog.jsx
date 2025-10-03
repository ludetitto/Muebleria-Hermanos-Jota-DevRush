import React, { useState, useMemo } from "react";
import ProductList from "../components/ProductList";
import ProductDetail from "../components/ProductDetail";

// Datos de prueba
const productosMock = [
  { id: 1, nombre: "Silla de madera", descripcion: "Silla robusta de madera maciza", precio: 25000, imagen: "/images/silla.jpg" },
  { id: 2, nombre: "Mesa de comedor", descripcion: "Mesa para 6 personas, acabado nogal", precio: 85000, imagen: "/images/mesa.jpg" },
  { id: 3, nombre: "Sofá moderno", descripcion: "Sofá 3 cuerpos, color gris", precio: 120000, imagen: "/images/sofa.jpg" },
];

export default function Catalog() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  const productosFiltrados = useMemo(() =>
    productosMock.filter(p => p.nombre.toLowerCase().includes(search.toLowerCase()))
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
              onSelect={(prod) => setSelected(prod)} // cuando clickeas pasa a detalle
            />
          </section>
        </main>
      ) : (
        // Vista detalle
        <ProductDetail
          producto={selected}
          onClose={() => setSelected(null)} // vuelve al catálogo
        />
      )}
    </>
  );
}
