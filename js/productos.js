const container = document.getElementById("productos-container");
const searchInput = document.getElementById("searchInput");

// Simulación de carga asíncrona
function cargarProductos() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(productos); // productos viene de data.js
    }, 800); // simula retraso
  });
}

// Render de productos
function renderProductos(lista, customContainer) { // Permite pasar un contenedor personalizado
  const target = customContainer || container;
  target.innerHTML = "";
  if (lista.length === 0) {
    target.innerHTML = "<p>No se encontraron productos.</p>";
    return;
  }

  lista.forEach(producto => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}">
      <div class="card-body">
        <h3>${producto.nombre}</h3>
        <p>${producto.descripcion.substring(0, producto.descripcion.indexOf('.') + 1)}</p>
        <a href="producto.html?id=${producto.id}" class = "btn-secondary">Ver detalle</a>
      </div>
    `;

    target.appendChild(card);
  });

  // Evento para los botones de carrito
  target.querySelectorAll('.boton-carrito').forEach(btn => {
    btn.addEventListener('click', function() {
      const id = parseInt(this.getAttribute('data-id'));
      const prod = lista.find(p => p.id === id);
      if (prod) {
        agregarAlCarrito(prod);
      }
    });
  });
}

// Inicialización
async function init() {
  const data = await cargarProductos();
  renderProductos(data);

  // Buscador
  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase();
    const filtrados = data.filter(p =>
      p.nombre.toLowerCase().includes(query) ||
      p.descripcion.toLowerCase().includes(query)
    );
    renderProductos(filtrados);
  });
}

init();