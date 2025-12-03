import React, { useState, useMemo } from "react";
import ProductList from "../components/ProductList";
import ProductDetail from "../components/ProductDetail";
import useProductos from "../hooks/useProductos";
import Banner from "../components/Banner";

export default function Catalog({
  onSelectProducto,
  onVolver,
  onAgregarAlCarrito,
}) {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  const { productos, loading, error, reload } = useProductos();

  const productosFiltrados = useMemo(() => {
    return productos.filter((p) =>
      p.nombre.toLowerCase().includes(search.toLowerCase())
    );
  }, [productos, search]);

  return (
    <>
      {!selected ? (
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
              <p>Cargando...</p>
            ) : error ? (
              <p className="error">Error al cargar los productos</p>
            ) : (
              <ProductList
                productos={productosFiltrados}
                onSelect={(prod) =>
                  onSelectProducto ? onSelectProducto(prod) : setSelected(prod)
                } // cuando clickeas pasa a detalle
              />
            )}
          </section>
        </main>
      ) : (
        // Vista detalle
        <ProductDetail
          producto={selected}
          onVolver={() => {
            setSelected(null);
            // recargar catálogo al volver
            reload();
          }} // vuelve al catálogo
          onAgregarAlCarrito={onAgregarAlCarrito}
        />
      )}
    </>
  );
}
