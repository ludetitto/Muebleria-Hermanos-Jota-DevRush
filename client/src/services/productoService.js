import API_ENDPOINTS from "../config/api";

const getAuthHeaders = () => {
  const token = localStorage.getItem("auth_token");
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

export async function getProductos() {
  const res = await fetch(API_ENDPOINTS.PRODUCTOS.BASE);
  if (!res.ok) throw new Error("Error al obtener productos");
  return await res.json();
}

export async function getProductoById(id) {
  const res = await fetch(API_ENDPOINTS.PRODUCTOS.BY_ID(id));
  if (!res.ok) throw new Error("Producto no encontrado");
  return await res.json();
}

export async function crearProducto(producto) {
  const res = await fetch(API_ENDPOINTS.PRODUCTOS.BASE, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(producto),
  });
  if (!res.ok) throw new Error("Error al crear producto");
  return await res.json();
}

export async function actualizarProducto(id, producto) {
  const res = await fetch(API_ENDPOINTS.PRODUCTOS.BY_ID(id), {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(producto),
  });
  if (!res.ok) throw new Error("Error al actualizar producto");
  return await res.json();
}

export async function eliminarProducto(id) {
  const res = await fetch(API_ENDPOINTS.PRODUCTOS.BY_ID(id), {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Error al eliminar producto");
  return await res.json();
}
