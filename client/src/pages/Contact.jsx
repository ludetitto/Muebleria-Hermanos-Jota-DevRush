import React from "react";
import "../assets/css/contacto.css";
import Banner from "../components/Banner";
import ContactForm from "../components/ContactForm";

export default function Contact() {
  return (
    <div>
      <Banner titulo="CONTACTO" ariaLabel="banner-contacto"></Banner>

      <main className="contact-main" role="main" data-bg="light">
        <section className=" info-text">
          <p>
            Complete el siguiente formulario y a la brevedad un representante se
            comunicará con usted.
          </p>
        </section>

        <div className="contact-container">
          <ContactForm />

          <div className="contact-column contact-map-column">
            <div className="map-wrapper">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3283.2168245958396!2d-58.4047736!3d-34.6239606!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccae2a0c04a2f%3A0x77f381af8f0ca1fa!2sAv.%20San%20Juan%202847%2C%20C1232AAK%20Cdad.%20Aut%C3%B3noma%20de%20Buenos%20Aires!5e0!3m2!1ses-419!2sar!4v1756860483716!5m2!1ses-419!2sar"
                className="map-iframe"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación de Hermanos Jota"
              ></iframe>

              {/* Overlay con información de ubicación */}
              <div className="location-overlay">
                <div className="location-card">
                  <h3>Visítanos en</h3>
                  <h4>Hermanos Jota — Casa Taller</h4>
                  <p className="address">
                    Av. San Juan 2847
                    <br />
                    Barrio de San Cristóbal
                    <br />
                    Ciudad Autónoma de Buenos Aires, Argentina
                  </p>
                  <div className="schedule">
                    <p className="schedule-title">Horario de atención:</p>
                    <p>Lunes a Viernes: 10:00 - 19:00</p>
                    <p>Sábados: 10:00 - 14:00</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
