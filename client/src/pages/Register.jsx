import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Banner from "../components/Banner";
import "../assets/css/auth.css";

export default function Register() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { register } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    if (formData.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    setLoading(true);

    const result = await register(
      formData.nombre,
      formData.email,
      formData.password
    );

    if (result.success) {
      navigate("/", { replace: true });
    } else {
      setError(result.error);
      setLoading(false);
    }
  };

  return (
    <>
      <Banner titulo="CREAR CUENTA" ariaLabel="banner-registro" />

      <main
        className="tight-container auth-container"
        role="main"
        data-bg="light"
      >
        <form className="auth-form" onSubmit={handleSubmit}>
          {error && (
            <div className="error-message" role="alert">
              {error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="nombre">Nombre completo *</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              required
              placeholder="Ingrese su nombre completo"
              value={formData.nombre}
              onChange={handleChange}
              disabled={loading}
              minLength={2}
              maxLength={50}
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
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña *</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              placeholder="Mínimo 6 caracteres"
              value={formData.password}
              onChange={handleChange}
              disabled={loading}
              minLength={6}
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmar contraseña *</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              required
              placeholder="Repita su contraseña"
              value={formData.confirmPassword}
              onChange={handleChange}
              disabled={loading}
              minLength={6}
            />
          </div>

          <button
            type="submit"
            className="btn-primary submit-btn"
            disabled={loading}
          >
            {loading ? "Creando cuenta..." : "Registrarse"}
          </button>

          <p className="auth-redirect">
            ¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link>
          </p>
        </form>
      </main>
    </>
  );
}
