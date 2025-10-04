import React from 'react';
import "../assets/css/contacto.css";
import Banner from '../components/Banner';
import ContactForm from '../components/ContactForm';

export default function Contact() {
    return (
        <div>
            <Banner titulo="CONTACTO" ariaLabel="banner-contacto"></Banner>
            <main className="container" role="main" data-bg="light">
                <ContactForm />
            </main>
        </div>
    )
}
