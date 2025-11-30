import React, { useState } from "react";
import "../assets/css/crearProducto.css";

export default function ProductForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    imagen: "",
    categoria: "",
    stock: "",
    destacado: false,
    detalles: {
      dimensiones: "",
      materiales: "",
      peso: "",
      garantia: "",
    },
  });

  const [mensaje, setMensaje] = useState({ tipo: "", texto: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.startsWith("detalles.")) {
      const detalleKey = name.split(".")[1];
      setFormData({
        ...formData,
        detalles: {
          ...formData.detalles,
          [detalleKey]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMensaje({ tipo: "", texto: "" });

    try {
      if (!formData.nombre.trim()) {
        throw new Error("El nombre del producto es obligatorio");
      }
      if (!formData.precio || formData.precio <= 0) {
        throw new Error("El precio debe ser mayor a 0");
      }

      const productoData = {
        ...formData,
        precio: parseFloat(formData.precio),
        stock: parseInt(formData.stock) || 0,
      };

      await onSubmit(productoData);

      setMensaje({
        tipo: "exito",
        texto: "¡Producto creado exitosamente!",
      });

      setTimeout(() => {
        setFormData({
          nombre: "",
          descripcion: "",
          precio: "",
          imagen: "",
          categoria: "",
          stock: "",
          destacado: false,
          detalles: {
            dimensiones: "",
            materiales: "",
            peso: "",
            garantia: "",
          },
        });
        setMensaje({ tipo: "", texto: "" });
      }, 2000);
    } catch (error) {
      setMensaje({
        tipo: "error",
        texto: error.message || "Error al crear el producto",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <h2>Nuevo Producto</h2>

      <div className="form-group">
        <label htmlFor="nombre">
          Nombre del Producto <span className="required-indicator">*</span>
        </label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          required
          placeholder="Ej: Silla Escandinava"
          value={formData.nombre}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="descripcion">
          Descripción <span className="required-indicator">*</span>
        </label>
        <textarea
          id="descripcion"
          name="descripcion"
          required
          placeholder="Describe el producto, sus características principales..."
          value={formData.descripcion}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="precio">
          Precio (ARS) <span className="required-indicator">*</span>
        </label>
        <input
          type="number"
          id="precio"
          name="precio"
          required
          min="0"
          step="0.01"
          placeholder="Ej: 15000.00"
          value={formData.precio}
          onChange={handleChange}
        />
        <p className="form-help-text">Ingrese el precio sin puntos ni comas</p>
      </div>

      <div className="form-group">
        <label htmlFor="imagen">URL de la Imagen</label>
        <input
          type="url"
          id="imagen"
          name="imagen"
          placeholder="https://ejemplo.com/imagen.jpg o /assets/productos/imagen.jpg"
          value={formData.imagen}
          onChange={handleChange}
        />
        <p className="form-help-text">
          URL completa o ruta relativa a /assets/productos/
        </p>
        {formData.imagen && (
          <div className="image-preview">
            <img
              src={formData.imagen}
              alt="Vista previa"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
            <p>Vista previa de la imagen</p>
          </div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="categoria">Categoría</label>
        <select
          id="categoria"
          name="categoria"
          value={formData.categoria}
          onChange={handleChange}
        >
          <option value="">Seleccione una categoría</option>
          <option value="sillas">Sillas</option>
          <option value="mesas">Mesas</option>
          <option value="sofas">Sofás</option>
          <option value="camas">Camas</option>
          <option value="almacenamiento">Almacenamiento</option>
          <option value="decoracion">Decoración</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="stock">Stock Disponible</label>
        <input
          type="number"
          id="stock"
          name="stock"
          min="0"
          placeholder="Ej: 10"
          value={formData.stock}
          onChange={handleChange}
        />
        <p className="form-help-text">
          Cantidad disponible en inventario (opcional)
        </p>
      </div>

      <div className="form-group-checkbox">
        <input
          type="checkbox"
          id="destacado"
          name="destacado"
          checked={formData.destacado}
          onChange={handleChange}
        />
        <label htmlFor="destacado">Marcar como producto destacado</label>
      </div>

      <div className="detalles-section">
        <h3>Detalles del Producto</h3>

        <div className="form-group">
          <label htmlFor="detalles.dimensiones">Dimensiones</label>
          <input
            type="text"
            id="detalles.dimensiones"
            name="detalles.dimensiones"
            placeholder="Ej: 80cm x 45cm x 90cm (ancho x prof x alto)"
            value={formData.detalles.dimensiones}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="detalles.materiales">Materiales</label>
          <input
            type="text"
            id="detalles.materiales"
            name="detalles.materiales"
            placeholder="Ej: Madera de roble, Acero inoxidable, Tela"
            value={formData.detalles.materiales}
            onChange={handleChange}
          />
          <p className="form-help-text">
            Separe múltiples materiales con comas
          </p>
        </div>

        <div className="form-group">
          <label htmlFor="detalles.peso">Peso</label>
          <input
            type="text"
            id="detalles.peso"
            name="detalles.peso"
            placeholder="Ej: 8.5 kg"
            value={formData.detalles.peso}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="detalles.garantia">Garantía</label>
          <input
            type="text"
            id="detalles.garantia"
            name="detalles.garantia"
            placeholder="Ej: 2 años"
            value={formData.detalles.garantia}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="product-form-buttons">
        <button type="submit" className="btn-primary" disabled={isSubmitting}>
          {isSubmitting ? "Creando..." : "Crear Producto"}
        </button>
        {onCancel && (
          <button
            type="button"
            className="btn-primary btn-danger"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancelar
          </button>
        )}
      </div>

      {mensaje.texto && (
        <div className={`mensaje-feedback ${mensaje.tipo}`}>
          {mensaje.texto}
        </div>
      )}
    </form>
  );
}
