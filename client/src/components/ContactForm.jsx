import React from 'react'
import {useState} from 'react'

export default function ContactForm() {
    const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    mensaje: "",
    });
    const [enviado, setEnviado] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
        ...formData,
        [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("¡Formulario enviado!:", formData);
        setEnviado(true);
        setFormData({ nombre: "", email: "", mensaje: "" });
    };

    return (
        <main className="container" data-bg="light">
        <section className="info-text">
            <p>
            Complete el siguiente formulario y a la brevedad un representante se
            comunicará con usted.
            </p>
        </section>

        <form className="contact-form" onSubmit={handleSubmit}>
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

            <button type="submit" className="submit-btn btn-primary">
            Enviar
            </button>
        </form>

        {enviado && (
            <div className={`mensaje-envio info-text ${enviado ? 'show' : ''}`}>
            <p>Formulario enviado correctamente ¡Gracias por contactarnos!</p>
            </div>
        )}
        </main>
    );
    }
