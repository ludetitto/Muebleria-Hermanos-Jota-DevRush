import React from "react";
import "../assets/css/nosotros.css";
import videoInstitucional from "../assets/Video institucional Hermanos Jota";

export default function About() {
  return (
    <>
      <section
        className="banner"
        aria-labelledby="Banner de contacto"
        data-bg="dark"
      >
        <h1 className="titulo-principal">SOBRE NOSOTROS</h1>
      </section>

      <main className="tight-container" role="main" data-bg="light">
        <section
          className="about-us info-text"
          aria-label="Información sobre nosotros"
        >
          <p>
            En Mueblería Hermanos Jota, nos dedicamos a crear muebles de alta
            calidad que combinan diseño, funcionalidad y sostenibilidad. Fundada
            en 1960, nuestra misión es transformar espacios con piezas únicas
            que reflejen el estilo y la personalidad de nuestros clientes.
          </p>
          <p>
            Nuestro equipo de artesanos utiliza materiales locales y técnicas
            tradicionales para garantizar que cada mueble no solo sea hermoso,
            sino también duradero y respetuoso con el medio ambiente. Creemos en
            la importancia de la sostenibilidad y nos esforzamos por minimizar
            nuestro impacto ambiental en cada etapa del proceso de producción.
          </p>
          <p>
            Ya sea que estés buscando un sofá cómodo, una mesa de comedor
            elegante o una cama acogedora, en Hermanos Jota encontrarás la pieza
            perfecta para tu hogar. Nos enorgullece ofrecer un servicio
            personalizado y asesoramiento experto para ayudarte a elegir los
            muebles que mejor se adapten a tus necesidades y gustos.
          </p>
          <p>
            Gracias por confiar en Mueblería Hermanos Jota. Estamos emocionados
            de ser parte de tu viaje para crear un hogar lleno de estilo,
            confort y sostenibilidad.
          </p>
          <video controls>
            <source src={videoInstitucional} type="video/mp4" />
            Tu navegador no soporta el elemento de video.
          </video>
        </section>
      </main>
    </>
  );
}
