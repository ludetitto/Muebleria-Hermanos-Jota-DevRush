/**
 * Script para cargar y renderizar datos del producto seleccionado
 */

function obtenerIdProductoURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("id");
}

function buscarProductoPorId(id) {
  return productos.find((producto) => producto.id == id) || null;
}

function obtenerPrimerDestacado() {
  return productos.find((producto) => producto.destacado) || null;
}

// Formatear el precio a pesos args
function formatearPrecio(precio) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  }).format(precio);
}

// Transforma cada material en un elemento <li>
function parsearMateriales(materiales) {
  return materiales
    .split(",")
    .map((material) => `<li>${material.trim()}</li>`)
    .join("");
}

function renderizarProducto(producto) {
  try {
    // Imagen del producto
    const imgProducto = document.getElementById("img-producto");
    if (imgProducto) {
      imgProducto.src = producto.imagen;
      imgProducto.alt = `Imagen de ${producto.nombre}`;
      imgProducto.loading = "lazy";
    }

    // Caption de la imagen
    const imgCaption = document.getElementById("product-image-caption");
    if (imgCaption) {
      imgCaption.textContent = `Imagen de ${producto.nombre}`;
      imgCaption.classList.remove("visually-hidden");
    }

    // Título del producto
    const titulo = document.getElementById("producto-titulo");
    if (titulo) {
      titulo.textContent = producto.nombre;
    }

    // Descripción del producto
    const descripcionContainer = document.querySelector("#desc-producto p");
    if (descripcionContainer) {
      descripcionContainer.textContent = producto.descripcion;
    }

    // Precio del producto
    const precioElement = document.getElementById("precio-producto");
    if (precioElement) {
      precioElement.textContent = formatearPrecio(producto.precio);
    }

    // Medidas
    const medidasContainer = document.querySelector(".medidas p");
    if (medidasContainer) {
      medidasContainer.textContent = producto.medidas;
    }

    // Materiales
    const materialesContainer = document.getElementById("producto-materiales");
    if (materialesContainer) {
      materialesContainer.innerHTML = parsearMateriales(producto.materiales);
    }

    // Acabado
    const acabadoContainer = document.querySelector(".acabado p");
    if (acabadoContainer) {
      acabadoContainer.textContent = producto.acabado;
    }

    // Actualizar títulos de página
    document.title = `${producto.nombre} - Mueblería Hermanos Jota`;
  } catch (error) {
    console.error("Error al renderizar el producto:", error);
    mostrarMensajeError("Error al cargar los datos del producto");
  }
}

// Mostrar mensaje de error cuando no se puede cargar el producto
function mostrarMensajeError(mensaje = "Producto no encontrado") {
  const main = document.getElementById("main");
  if (main) {
    main.innerHTML = `
      <section class="error-container" style="text-align: center; padding: 2rem;">
        <h1>¡Oops! ${mensaje}</h1>
        <p>No pudimos encontrar el producto que buscas.</p>
        <a href="productos.html" class="btn-primario" style="display: inline-block; margin-top: 1rem;">
          Ver todos los productos
        </a>
      </section>
    `;
  }

  document.title = "Producto no encontrado - Mueblería Hermanos Jota";
}

// Funciones auxiliares temporales para evitar el flickering al inicar el DOM
const ELEMENTOS_CARGA = ["#main", "footer"];
const CLASES_CARGA = {
  loading: "producto-loading",
  loaded: "producto-loaded",
};

function controlarVisibilidadContenido(mostrar = false) {
  ELEMENTOS_CARGA.forEach((selector) => {
    const elemento = selector.startsWith("#")
      ? document.getElementById(selector.slice(1))
      : document.querySelector(selector);

    if (elemento) {
      elemento.classList.toggle(CLASES_CARGA.loading, !mostrar);
      elemento.classList.toggle(CLASES_CARGA.loaded, mostrar);
    }
  });
}

function ocultarContenido() {
  controlarVisibilidadContenido(false);
}

function mostrarContenido() {
  controlarVisibilidadContenido(true);
}

// Inicialización del DOM
function inicializarPaginaProducto() {
  ocultarContenido();

  if (typeof productos === "undefined" || !Array.isArray(productos)) {
    mostrarMensajeError("Error al cargar los datos de productos");
    return;
  }

  const idProducto = obtenerIdProductoURL();
  let productoACargar = null;

  if (idProducto) {
    mostrarContenido();
    productoACargar = buscarProductoPorId(idProducto);

    if (!productoACargar) {
      console.warn(`Producto con ID ${idProducto} no encontrado`);
      // Si no se encuentra el producto, carga el primer producto destacado.
      //productoACargar = obtenerPrimerDestacado();
    }
  } /*else {
    // Si no se encuentra el ID en la url, mostrar producto destacado
    productoACargar = obtenerPrimerDestacado();
  }*/

  if (productoACargar) {
    renderizarProducto(productoACargar);
    configurarBotonCarrito(productoACargar);
  } else {
    // Si no se encuentra el producto mostrar mensaje de error
    mostrarContenido();
    console.error("No se encontraron productos destacados ni producto válido");
    mostrarMensajeError();
  }
}

// Inicializar cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", function () {
  inicializarPaginaProducto();
});

// También inicializar si el DOM ya está cargado
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", inicializarPaginaProducto);
} else {
  inicializarPaginaProducto();
}
