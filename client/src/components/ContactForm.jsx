import React, { useState, useRef, useEffect } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    mensaje: "",
  });
  const [enviado, setEnviado] = useState(false);
  const mensajeRef = useRef(null);

  useEffect(() => {
    if (enviado && mensajeRef.current) {
      mensajeRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [enviado]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEnviado(true);
    setFormData({ nombre: "", email: "", mensaje: "" });
    setTimeout(() => setEnviado(false), 5000);
  };

  return (
    <>
      <form className="cf-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nombre">Nombre *</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            required
            placeholder="Ingrese su nombre completo"
            value={formData.nombre}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="ejemplo@correo.com"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="mensaje">Consulta *</label>
          <textarea
            id="mensaje"
            name="mensaje"
            required
            placeholder="Escriba su consulta aquí..."
            value={formData.mensaje}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn-primary submit-btn">
          Enviar
        </button>
      </form>

      {enviado && (
        <div ref={mensajeRef} className="cf-msg show">
          <p>Formulario enviado correctamente ¡Gracias por contactarnos!</p>
        </div>
      )}
    </>
  );
}
