/**
 * Configuración centralizada de URLs de API
 * Se adapta automáticamente según el entorno (desarrollo/producción)
 */

const getApiUrl = () => {
  if (process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL;
  }

  if (
    window.location.hostname !== "localhost" &&
    window.location.hostname !== "127.0.0.1"
  ) {
    return window.location.origin;
  }

  return "http://localhost:5000";
};

export const API_URL = getApiUrl();

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_URL}/api/auth/login`,
    REGISTER: `${API_URL}/api/auth/register`,
    ME: `${API_URL}/api/auth/me`,
    VERIFY_TOKEN: `${API_URL}/api/auth/verify-token`,
  },

  PRODUCTOS: {
    BASE: `${API_URL}/api/productos`,
    BY_ID: (id) => `${API_URL}/api/productos/${id}`,
  },

  PEDIDOS: {
    BASE: `${API_URL}/api/pedidos`,
    BY_ID: (id) => `${API_URL}/api/pedidos/${id}`,
  },

  CART: {
    BASE: `${API_URL}/api/carrito`,
    ADD: `${API_URL}/api/carrito/add`,
    UPDATE: (productId) => `${API_URL}/api/carrito/update/${productId}`,
    REMOVE: (productId) => `${API_URL}/api/carrito/remove/${productId}`,
    CLEAR: `${API_URL}/api/carrito/clear`,
    SYNC: `${API_URL}/api/carrito/sync`,
  },
};

// Helper para logging (solo en desarrollo)
if (process.env.NODE_ENV === "development") {
  console.log("API Configuration:");
  console.log("  - Environment:", process.env.NODE_ENV);
  console.log("  - API URL:", API_URL);
  console.log(
    "  - Custom API URL:",
    process.env.REACT_APP_API_URL || "Not set"
  );
}

export default API_ENDPOINTS;
