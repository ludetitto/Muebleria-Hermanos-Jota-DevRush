// Requiere que productos.js y data.js estén cargados antes
document.addEventListener("DOMContentLoaded", function () {
  // Nombres de los productos destacados en el orden mostrado
  const destacadosNombres = [
    "Sillón Copacabana",
    "Mesa Comedor Pampa",
    "Biblioteca Recoleta"
  ];
  // Espera a que productos esté disponible y renderProductos esté definida
  if (typeof productos !== "undefined" && typeof renderProductos === "function") {
    const destacados = destacadosNombres.map(nombre =>
      productos.find(p => p.nombre.trim().toLowerCase() === nombre.trim().toLowerCase()) // Buscar por nombre ignorando mayúsculas y minúsculas
    ).filter(Boolean);
    const container = document.getElementById("destacados-container");
    if (container) {
      renderProductos(destacados, container);
    }
  }
  actualizarContadorCarrito();
});
