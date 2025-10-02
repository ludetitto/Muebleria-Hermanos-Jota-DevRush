import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import './assets/css/styles.css';

export default function App() {
  const handleVerProductos = () => {
    window.location.href = '/productos';
  };

  return (
    <>
      <Navbar />
      <Home onVerProductos={handleVerProductos} />
      <Footer />
    </>
  );
}
