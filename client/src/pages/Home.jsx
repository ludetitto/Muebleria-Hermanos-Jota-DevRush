import "../assets/css/home.css";
import logo from "../assets/logo.svg";
import imgFilosofia from "../assets/images/img-filosofia.jpg";
import ProductList from "../components/ProductList";
import useProductos from "../hooks/useProductos";

export default function Home({ onVerProductos, onSelectProducto }) {
  const { productos, loading, error } = useProductos();

  return (
    <main>
      {/* Hero principal */}
      <section id="hero-banner" data-bg="dark">
        <div className="hero-content">
          <img id="logo-img" src={logo} alt="Logo de Mueblería Hermanos Jota" />
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
        <h2 className="titulo-principal">NUESTROS DESTACADOS</h2>
        <div className="grid" id="destacados-container">
          {loading ? (
            <p>Cargando destacados…</p>
          ) : error ? (
            <p className="error">Error cargando destacados: {error}</p>
          ) : (
            <ProductList
              productos={productos.filter((p) => p.destacado)}
              onSelect={(p) => (onSelectProducto ? onSelectProducto(p) : null)}
            />
          )}
        </div>
      </section>

      {/* Sección Filosofía */}
      <section className="filosofia" data-bg="dark">
        <div className="content">
          <h2 className="titulo-principal">NUESTRA FILOSOFÍA</h2>
          <p>
            En Hermanos Jota creemos que los muebles no solo cumplen una
            función, sino que son parte de la vida diaria. Apostamos por
            materiales nobles, diseños atemporales y sustentabilidad en cada
            pieza.
          </p>
        </div>
        <img
          id="philosophy-img"
          src={imgFilosofia}
          alt="Imagen nuestra filosofía"
        ></img>
      </section>
    </main>
  );
}
