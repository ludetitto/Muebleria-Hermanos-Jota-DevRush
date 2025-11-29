// Servicio para interactuar con la API de productos
// Detecta automáticamente el entorno
const getBaseURL = () => {
  // Si estás en localhost (desarrollo local) usar backend local
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return 'http://localhost:5000';
  }
  return 'https://muebleria-hermanos-jota-devrush.onrender.com';
};

const API_URL = `${getBaseURL()}/api/productos`;

export async function getProductos() {
	const res = await fetch(API_URL);
	if (!res.ok) throw new Error("Error al obtener productos");
	return await res.json();
}

export async function getProductoById(id) {
	const res = await fetch(`${API_URL}/${id}`);
	if (!res.ok) throw new Error("Producto no encontrado");
	return await res.json();
}

export async function crearProducto(producto) {
	const res = await fetch(API_URL, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(producto),
	});
	if (!res.ok) throw new Error("Error al crear producto");
	return await res.json();
}

export async function actualizarProducto(id, producto) {
	const res = await fetch(`${API_URL}/${id}`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(producto),
	});
	if (!res.ok) throw new Error("Error al actualizar producto");
	return await res.json();
}

export async function eliminarProducto(id) {
	const res = await fetch(`${API_URL}/${id}`, {
		method: "DELETE" });
	if (!res.ok) throw new Error("Error al eliminar producto");
	return await res.json();
}
