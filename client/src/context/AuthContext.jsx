import React, { createContext, useState, useEffect, useContext } from "react";
import API_ENDPOINTS from "../config/api";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const savedToken = localStorage.getItem("auth_token");

        if (savedToken) {
          // Verificar si el token sigue siendo valido
          const response = await fetch(API_ENDPOINTS.AUTH.VERIFY_TOKEN, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${savedToken}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            setToken(savedToken);
            setUser(data.user);
            try {
              sessionStorage.setItem("user", JSON.stringify(data.user));
            } catch (err) {
              console.warn("No se pudo guardar user en sessionStorage", err);
            }
            setIsAuthenticated(true);
          } else {
            // Token inválido o expirado
            sessionStorage.removeItem("auth_token");
            sessionStorage.removeItem("user");
          }
        }
      } catch (error) {
        console.error("Error al verificar token:", error);
        sessionStorage.removeItem("auth_token");
        try {
          localStorage.removeItem("auth_token");
          localStorage.removeItem("user");
        } catch (e) {
          /* ignore */
        }
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  // Login
  const login = async (email, password) => {
    try {
      const response = await fetch(API_ENDPOINTS.AUTH.LOGIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error al iniciar sesión");
      }

      sessionStorage.setItem("auth_token", data.token);
      setToken(data.token);
      setUser(data.user);
      try {
        sessionStorage.setItem("user", JSON.stringify(data.user));
      } catch (err) {
        console.warn("No se pudo guardar user en sessionStorage", err);
      }
      try {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("user");
      } catch (e) {
        /* ignore */
      }
      setIsAuthenticated(true);

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Registro
  const register = async (nombre, email, password) => {
    try {
      const response = await fetch(API_ENDPOINTS.AUTH.REGISTER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nombre, email, password }),
      });

      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        throw new Error(data.error || "Error al registrarse");
      }

      sessionStorage.setItem("auth_token", data.token);
      setToken(data.token);
      setUser(data.user);
      try {
        sessionStorage.setItem("user", JSON.stringify(data.user));
      } catch (err) {
        console.warn("No se pudo guardar user en sessionStorage", err);
      }
      try {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("user");
      } catch (e) {
        /* ignore */
      }
      setIsAuthenticated(true);

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Logout
  const logout = () => {
    sessionStorage.removeItem("auth_token");
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    try {
      sessionStorage.removeItem("user");
    } catch (err) {
    }
    try {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("user");
    } catch (e) {
      /* ignore */
    }
  };

  const getAuthHeaders = () => {
    if (!token) return {};
    return {
      Authorization: `Bearer ${token}`,
    };
  };

  const value = {
    user,
    token,
    loading,
    isAuthenticated,
    login,
    register,
    logout,
    getAuthHeaders,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
