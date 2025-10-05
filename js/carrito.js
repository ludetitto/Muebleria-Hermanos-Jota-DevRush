const CARRITO_KEY = "carrito_almacenado";

function obtenerCarrito() {
  return JSON.parse(localStorage.getItem(CARRITO_KEY)) || [];
}

function guardarCarrito(carrito) {
  localStorage.setItem(CARRITO_KEY, JSON.stringify(carrito));
}

function agregarEnElCarrito(producto) {
  const carrito = obtenerCarrito();
  const existente = carrito.find(p => p.id === producto.id);
  if (existente) {
    existente.cantidad = (existente.cantidad || 1) + producto.cantidad;
  } else {
    carrito.push({ ...producto, cantidad: producto.cantidad } );
  }
  guardarCarrito(carrito);
  mostrarToast(`${producto.nombre} agregado al carrito`);
  actualizarContadorCarrito();
}

function mostrarToast(mensaje) { // Notificación de agregado
  let toast = document.createElement("div");
  toast.textContent = mensaje;
  toast.style.position = "fixed";
  toast.style.bottom = "30px";
  toast.style.right = "30px";
  toast.style.background = "#D4A437";
  toast.style.color = "#fff";
  toast.style.padding = "12px 24px";
  toast.style.borderRadius = "8px";
  toast.style.zIndex = "9999";
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 1800);
}

function actualizarContadorCarrito() {
  const carrito = obtenerCarrito(); // Lee el carrito del localStorage
  const totalProductos = carrito.reduce((acc, prod) => acc + parseInt(prod.cantidad) || 0, 0);

  const contador = document.getElementById("contador-carrito");
  if (contador) {
    contador.textContent = totalProductos;
  }
}

// Eliminar producto
function eliminarProductoCarrito(id) {
  let carrito = obtenerCarrito();
  carrito = carrito.filter(p => p.id !== id);
  guardarCarrito(carrito);
  actualizarContadorCarrito();
}

function mostrarModalCarrito() {
  const carrito = obtenerCarrito();

  const modal = document.createElement("div");
  modal.classList.add("modal-fondo");

  const contenido = document.createElement("div");
  contenido.classList.add("modal-contenido");

  setTimeout(() => contenido.classList.add("show"), 10); // Animación de aparición

  // Botón cerrar
  const cerrar = document.createElement("span");
  cerrar.classList.add("cerrar");
  cerrar.textContent = "×";
  cerrar.addEventListener("click", () => document.body.removeChild(modal));

  // Título
  const titulo = document.createElement("h2");
  titulo.textContent = "Mi Carrito";

  // Lista de productos
  const lista = document.createElement("ul");
  if (carrito.length === 0) {
    const li = document.createElement("li");
    li.textContent = "El carrito está vacío";
    lista.appendChild(li);
  } else {
    carrito.forEach(prod => {
      const li = document.createElement("li");
      li.style.flexDirection = "column";
      li.style.alignItems = "flex-start";

      // Info principal
      const info = document.createElement("span");
      info.textContent = `${prod.nombre}`;

      // Cantidad y precio
      const detalles = document.createElement("span");
      detalles.style.fontSize = "0.9em";
      detalles.style.color = "#555";
      const subtotal = (prod.precio || 0) * prod.cantidad;
      detalles.textContent = `Cantidad: ${prod.cantidad} | Precio unitario: $${prod.precio || 0} | Subtotal: $${subtotal}`;

      // Botón eliminar
      const btnEliminar = document.createElement("button");
      btnEliminar.classList.add("btn-eliminar");
      btnEliminar.textContent = "Eliminar";
      btnEliminar.addEventListener("click", () => {
        eliminarProductoCarrito(prod.id);
        document.body.removeChild(modal);
        mostrarModalCarrito();
      });

      li.appendChild(info);
      li.appendChild(detalles);
      li.appendChild(btnEliminar);
      lista.appendChild(li);
    });
  }

  // Total
  const totalProductos = carrito.reduce((acc, p) => acc + p.cantidad, 0);
  const totalPrecio = carrito.reduce((acc, p) => acc + (p.precio || 0) * p.cantidad, 0);
  const total = document.createElement("p");
  total.classList.add("total");
  total.textContent = `Total: ${totalProductos} productos - $${totalPrecio}`;

  // Cerrar modal al hacer clic fuera
  modal.addEventListener("click", (e) => {
    if (e.target === modal) document.body.removeChild(modal);
  });

  contenido.appendChild(cerrar);
  contenido.appendChild(titulo);
  contenido.appendChild(lista);
  contenido.appendChild(total);
  modal.appendChild(contenido);
  document.body.appendChild(modal);
}


// Inicialización
  document.addEventListener("DOMContentLoaded", () => {
    actualizarContadorCarrito();
    const btnCarrito = document.getElementById("btn-ver-carrito");
    if (btnCarrito) btnCarrito.addEventListener("click", mostrarModalCarrito);
  });