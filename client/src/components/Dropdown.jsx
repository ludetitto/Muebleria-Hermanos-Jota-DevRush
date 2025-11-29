import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../assets/css/userDropdown.css";

//Dropdown de usuario para header
export default function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    if (window.confirm("¿Estás seguro que deseas cerrar sesión?")) {
      logout();
      navigate("/");
      setIsOpen(false);
    }
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  return (
    <div className="user-dropdown-container" ref={dropdownRef}>
      <button
        className="user-icon-button"
        onClick={toggleDropdown}
        title={isAuthenticated ? `Hola, ${user?.nombre}` : "Cuenta"}
        aria-label="Menú de usuario"
        aria-expanded={isOpen}
      >
        <svg
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          focusable="false"
        >
          <circle cx="12" cy="8" r="4" fill="currentColor" />
          <path
            d="M12 14c-5 0-8 2.5-8 5v2h16v-2c0-2.5-3-5-8-5z"
            fill="currentColor"
          />
        </svg>
      </button>

      {isOpen && (
        <div className={`user-dropdown-menu ${isOpen ? "show" : ""}`}>
          {isAuthenticated ? (
            <>
              <div className="dropdown-header">
                <span className="user-greeting">
                  Hola, {user?.nombre || "Usuario"}
                </span>
                <span className="user-email">{user?.email}</span>
              </div>
              <div className="dropdown-divider"></div>
              <Link
                to="/perfil"
                className="dropdown-item"
                onClick={closeDropdown}
              >
                <svg
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="dropdown-icon"
                >
                  <circle cx="12" cy="8" r="4" fill="currentColor" />
                  <path
                    d="M12 14c-5 0-8 2.5-8 5v2h16v-2c0-2.5-3-5-8-5z"
                    fill="currentColor"
                  />
                </svg>
                Mi Perfil
              </Link>
              <div className="dropdown-divider"></div>
              <button
                className="dropdown-item logout-item"
                onClick={handleLogout}
              >
                <svg
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="dropdown-icon"
                >
                  <path
                    d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"
                    fill="currentColor"
                  />
                </svg>
                Cerrar Sesión
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="dropdown-item"
                onClick={closeDropdown}
              >
                <svg
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="dropdown-icon"
                >
                  <path
                    d="M11 7L9.6 8.4l2.6 2.6H2v2h10.2l-2.6 2.6L11 17l5-5-5-5zm9 12h-8v2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-8v2h8v14z"
                    fill="currentColor"
                  />
                </svg>
                Iniciar Sesión
              </Link>
              <div className="dropdown-divider"></div>
              <Link
                to="/registro"
                className="dropdown-item"
                onClick={closeDropdown}
              >
                <svg
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="dropdown-icon"
                >
                  <path
                    d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                    fill="currentColor"
                  />
                </svg>
                Registrarse
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
}
