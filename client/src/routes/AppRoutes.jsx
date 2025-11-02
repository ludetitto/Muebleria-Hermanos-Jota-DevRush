import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Catalog from "../pages/Catalog";
import ProductDetailPage from "../pages/ProductDetailPage";
import Contact from "../pages/Contact";
import CrearProducto from "../pages/CrearProducto";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/productos" element={<Catalog />} />
    <Route path="/productos/:id" element={<ProductDetailPage />} />
    <Route path="/contacto" element={<Contact />} />
    <Route path="/admin/crear-producto" element={<CrearProducto />} /> 
  </Routes>
);

export default AppRoutes;
