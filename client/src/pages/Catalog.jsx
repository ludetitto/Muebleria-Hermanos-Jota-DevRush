import React, { useState, useMemo } from "react";
import ProductList from "../components/ProductList";
import { useNavigate } from "react-router-dom";
import useProductos from "../hooks/useProductos";
import Banner from "../components/Banner";
import "../assets/css/productos.css";
import Loader from "../components/Loader";

export default function Catalog() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const { productos, loading, error } = useProductos();

  const productosFiltrados = useMemo(() => {
    return productos.filter((p) =>
      p.nombre.toLowerCase().includes(search.toLowerCase())
    );
  }, [productos, search]);

  const handleSelectProducto = (producto) => {
    const productoId = producto._id || producto.id;
    navigate(`/productos/${productoId}`);
  };

  return (
    <main data-bg="light">
      <Banner titulo="CATÁLOGO DE PRODUCTOS" ariaLabel="banner-catálogo">
        <div className="form-group">
          <input
            type="text"
            id="searchInput"
            placeholder="Buscar productos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </Banner>

      <section className="catalogo">
        {loading ? (
          <Loader text="Cargando productos..."></Loader>
        ) : error ? (
          <p className="error">Error al cargar los productos</p>
        ) : (
          <ProductList
            productos={productosFiltrados}
            onSelect={handleSelectProducto}
          />
        )}
      </section>
    </main>
  );
}
