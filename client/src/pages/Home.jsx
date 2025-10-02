import './Home.css';
import logo from '../assets/logo.svg';

export default function Home({ onVerProductos }) {
  return (
    <main>
      {/* Hero principal */}
      <section id="hero-banner" data-bg="dark">
        <div className="hero-content">
          <img id="logo-img" src={logo} alt="Logo de Mueblería Hermanos Jota" />
          <h1 id="brand-name" className="titulo-principal">Hermanos Jota</h1>
          <p>Encuentra los mejores muebles para tu hogar con nosotros.</p>
          {onVerProductos ? (
            <button className="btn-primary" onClick={onVerProductos}>Ver Productos</button>
          ) : (
            <a className="btn-primary" href="/productos">Ver Productos</a>
          )}
        </div>
      </section>

      {/* Sección Destacados */}
      <section className="productos-destacados" data-bg="light">
        <h2 className="titulo-principal">NUESTROS DESTACADOS</h2>
        <div className="grid-productos destacados" id="destacados-container">
          {/* TODO: Renderizar destacados usando componentes cuando haya datos */}
        </div>
      </section>

      {/* Sección Filosofía */}
      <section className="filosofia" data-bg="dark">
        <h2 className="titulo-principal">NUESTRA FILOSOFÍA</h2>
        <p>
          En Hermanos Jota creemos que los muebles no solo cumplen una función,
          sino que son parte de la vida diaria. Apostamos por materiales nobles,
          diseños atemporales y sustentabilidad en cada pieza.
        </p>
      </section>
    </main>
  );
}
