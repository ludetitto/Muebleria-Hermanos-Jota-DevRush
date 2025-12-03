import "../assets/css/home.css";
import logo from "../assets/logo.svg";
import ProductList from "../components/ProductList";
import useProductos from "../hooks/useProductos";
import { ReactComponent as Divider } from "../assets/images/DecorativeDivider2.svg";

export default function Home({ onVerProductos, onSelectProducto }) {
  const { productos, loading, error } = useProductos();

  return (
    <main>
      {/* Hero principal */}
      <section id="hero-banner" data-bg="dark">
        <div className="hero-content">
          <img
            id="logo-img"
            src={logo}
            alt="Logo de Mueblería Hermanos Jota"
            loading="lazy"
          />
          <h1 id="brand-name" className="titulo-principal">
            Hermanos Jota
          </h1>
          <p>Encuentra los mejores muebles para tu hogar con nosotros.</p>
          {onVerProductos ? (
            <button className="btn-primary" onClick={onVerProductos}>
              Ver Productos
            </button>
          ) : (
            <a className="btn-primary" href="/productos">
              Ver Productos
            </a>
          )}
        </div>
      </section>

      {/* Sección de productos destacados */}
      <section className="productos-destacados" data-bg="light">
        <h2 className="titulo-principal destacados">NUESTROS DESTACADOS</h2>
        <Divider className="divider-svg" aria-hidden="true" />
        <div className="grid" id="destacados-container">
          {loading ? (
            <p>Cargando destacados…</p>
          ) : error ? (
            <p className="error">Error cargando destacados: {error}</p>
          ) : (
            <ProductList productos={productos.filter((p) => p.destacado)} />
          )}
        </div>
      </section>

      {/* Sección Filosofía */}
      <section className="filosofia" data-bg="light">
        <h2 className="titulo-principal">NUESTRA FILOSOFÍA</h2>
        <Divider className="divider-svg" aria-hidden="true" />
        <div className="content">
          <div className="text">
            <p>
              En Hermanos Jota creemos que los muebles no solo cumplen una
              función, sino que son parte de la vida diaria. Apostamos por
              materiales nobles, diseños atemporales y sustentabilidad en cada
              pieza.
            </p>
            <span
              className="flora flora--leaf"
              aria-hidden="true"
              dangerouslySetInnerHTML={{
                __html: `
  <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" focusable="false" role="img">
    <path d="M32 4c-8 8-16 16-24 24 8 8 16 16 24 24 8-8 16-16 24-24C48 20 40 12 32 4z" fill="currentColor" opacity="0.12"/>
    <path d="M30 6c-6 6-12 12-18 18 6 6 12 12 18 18 6-6 12-12 18-18C42 18 36 12 30 6z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
  </svg>
`,
              }}
            />

            <span
              className="flora flora--flower"
              aria-hidden="true"
              dangerouslySetInnerHTML={{
                __html: `
  <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" focusable="false" role="img">
    <circle cx="32" cy="32" r="6" fill="currentColor" opacity="0.14"/>
    <g stroke="currentColor" strokeWidth="1.4" fill="none">
      <path d="M32 6 Q36 18 32 22 Q28 18 32 6z" />
      <path d="M32 42 Q36 54 32 58 Q28 54 32 42z" />
      <path d="M6 32 Q18 36 22 32 Q18 28 6 32z" />
      <path d="M42 32 Q54 36 58 32 Q54 28 42 32z" />
    </g>
  </svg>
`,
              }}
            />

            <span
              className="flora flora--bud"
              aria-hidden="true"
              dangerouslySetInnerHTML={{
                __html: `
  <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" focusable="false" role="img">
    <ellipse cx="16" cy="22" rx="8" ry="3" fill="currentColor" opacity="0.10"/>
    <path d="M16 6 C19 8 21 12 18 15 C15 18 11 16 13 11 C15 8 16 6 16 6z" fill="none" stroke="currentColor" strokeWidth="1.1"/>
  </svg>
`,
              }}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
