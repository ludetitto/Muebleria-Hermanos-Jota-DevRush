import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Catalog from "../pages/Catalog";
import ProductDetailPage from "../pages/ProductDetailPage";
import Contact from "../pages/Contact";
import About from "../pages/About";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import CartPage from "../pages/CartPage";
import ProtectedRoute from "../components/ProtectedRoute";
import EditarProducto from "../components/EditarProducto";
import CrearProducto from "../pages/CrearProducto";
import AdminRoute from "../components/AdminRoute";

const AppRoutes = () => (
  <Routes>
    {/* Rutas públicas */}
    <Route path="/" element={<Home />} />
    <Route path="/productos" element={<Catalog />} />
    <Route path="/productos/:id" element={<ProductDetailPage />} />
    <Route path="/nosotros" element={<About />} />
    <Route path="/contacto" element={<Contact />} />
    <Route path="/login" element={<Login />} />
    <Route path="/registro" element={<Register />} />
    <Route path="/admin/crear-producto" element={<AdminRoute><CrearProducto /></AdminRoute>} />

    {/* Rutas protegidas */}
    <Route
      path="/productos/editar/:id"
      element={
        <ProtectedRoute>
          <EditarProducto />
        </ProtectedRoute>
      }
    />

    <Route
      path="/perfil"
      element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      }
    />

    <Route path="/carrito" element={<CartPage />} />
  </Routes>
);

export default AppRoutes;
