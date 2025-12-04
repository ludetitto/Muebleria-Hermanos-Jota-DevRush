import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { actualizarProducto } from "../services/productoService";
import Banner from "../components/Banner";
import { FaEdit } from "react-icons/fa";
import "../assets/css/crearProducto.css";
import "../assets/css/productForm.css";

const EditarProducto = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // --- FUNCIONES AUXILIARES PARA EL ESTADO ---
  const convertDetailsObjectToList = (detallesObjeto) => {
    if (!detallesObjeto || Object.keys(detallesObjeto).length === 0) {
      return [{ id: Date.now(), key: "", value: "" }];
    }
    return Object.entries(detallesObjeto).map(([key, value]) => ({
      id: Date.now() + Math.random(),
      key,
      value: String(value),
    }));
  };

  // --- ESTADOS ---
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    stock: "",
    imagen: "",
    categoria: "",
    destacado: false,
  });
  const [detallesList, setDetallesList] = useState([
    { id: Date.now(), key: "", value: "" },
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // EFECTO: CARGAR DATOS DEL PRODUCTO EXISTENTE (GET)
  useEffect(() => {
    const fetchProducto = async () => {
      if (!id) return;
      // ... (Lógica de fetch GET por ID) ...
      try {
        const res = await fetch(`/api/productos/${id}`);
        if (!res.ok) throw new Error("No se pudo cargar el producto.");
        const data = await res.json();

        setFormData({
          nombre: data.nombre || "",
          descripcion: data.descripcion || "",
          precio: data.precio !== undefined ? String(data.precio) : "",
          stock: data.stock !== undefined ? String(data.stock) : "",
          imagen: data.imagen || "",
          categoria: data.categoria || "",
          destacado: data.destacado || false,
        });
        setDetallesList(convertDetailsObjectToList(data.detalles));
      } catch (error) {
        console.error("Error de carga:", error);
        Swal.fire(
          "Error",
          "No se pudo cargar el producto para edición.",
          "error"
        );
        navigate("/productos");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducto();
  }, [id, navigate]);

  // --- MANEJADORES ---
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleDetallesChange = (id, field, value) => {
    setDetallesList(
      detallesList.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const handleAddDetalle = () => {
    setDetallesList([...detallesList, { id: Date.now(), key: "", value: "" }]);
  };

  const handleRemoveDetalle = (id) => {
    setDetallesList(detallesList.filter((item) => item.id !== id));
  };

  //  LÓGICA DE ENVÍO (PUT)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting || isLoading) return;
    setIsSubmitting(true);
    // Validaciones básicas
    if (
      !formData.nombre.trim() ||
      formData.precio === "" ||
      isNaN(Number(formData.precio))
    ) {
      Swal.fire({
        title: "Advertencia",
        text: "Debe completar el Nombre y un Precio válido.",
        icon: "warning",
      });
      setIsSubmitting(false);
      return;
    }

    const detallesObjeto = {};
    detallesList.forEach((item) => {
      const key = item.key.trim();
      let value = item.value.trim();
      if (!key) return;
      if (!isNaN(parseFloat(value)) && value !== "") value = Number(value);
      else if (value.toLowerCase() === "true") value = true;
      else if (value.toLowerCase() === "false") value = false;
      detallesObjeto[key] = value;
    });

    const productoData = {
      nombre: formData.nombre.trim(),
      descripcion: formData.descripcion.trim(),
      precio: parseFloat(formData.precio),
      stock: parseInt(formData.stock, 10) || 0,
      imagen: formData.imagen.trim(),
      categoria: formData.categoria.trim(),
      destacado: formData.destacado,
      detalles: detallesObjeto,
    };

    try {
      await actualizarProducto(id, productoData);

      Swal.fire({
        title: "¡Guardado!",
        text: `El producto '${productoData.nombre}' ha sido actualizado con éxito.`,
        icon: "success",
      });
      navigate("/productos"); // Redirige catalogo
    } catch (error) {
      console.error("Error al actualizar el formulario:", error);
      Swal.fire({
        title: "Error de Actualización",
        html: `No se pudo actualizar el producto.<br><b>Detalle:</b> ${error.message}`,
        icon: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  //RENDERIZADO CON LAYOUT DE CREARPRODUCTO
  if (isLoading) {
    return <p>Cargando datos del producto...</p>;
  }

  return (
    <div>
      <Banner
        titulo="EDITAR PRODUCTO"
        ariaLabel="banner-edicion"
        icon={<FaEdit />}
      />

      <main id="admin-main-content" role="main">
        <section className="admin-prod">
          <h1 className="admin-prod__ttl">
            {/* Título modificado */}
            Modifique la información del producto {formData.nombre}
          </h1>

          <div className="admin-prod__box">
            {/* FORMULARIO  */}
            <form className="product-page-content" onSubmit={handleSubmit}>
              <div className="product-page-header">
                <h1 className="page-title">Detalles del Producto (ID: {id})</h1>
                <div className="header-actions">
                  <button
                    type="submit"
                    className="btn-primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Guardando cambios..." : "Guardar cambios"}
                  </button>
                </div>
              </div>
              <div className="form-columns-container">
                <div className="column-left">
                  <div className="form-card">
                    <h3 className="card-title">Información Principal</h3>
                    {/* inputs de nombre, descripcion, precio, stock */}
                    <div className="form-group">
                      <label htmlFor="nombre">Nombre del producto*</label>
                      <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="descripcion">Descripción</label>
                      <textarea
                        id="descripcion"
                        name="descripcion"
                        value={formData.descripcion}
                        onChange={handleChange}
                        maxLength="1000"
                      />
                    </div>
                    <div className="inline-group">
                      <div className="form-group">
                        <label htmlFor="precio">Precio*</label>
                        <input
                          type="number"
                          id="precio"
                          name="precio"
                          value={formData.precio}
                          onChange={handleChange}
                          min="0"
                          step="0.01"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="stock">Stock*</label>
                        <input
                          type="number"
                          id="stock"
                          name="stock"
                          value={formData.stock}
                          onChange={handleChange}
                          min="0"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-card">
                    <h3 className="card-title">
                      Detalles Técnicos y Características
                    </h3>
                    {detallesList.map((detalle) => (
                      <div
                        key={detalle.id}
                        className="inline-group detail-item"
                      >
                        <div className="form-group detail-key">
                          <input
                            type="text"
                            placeholder="Característica"
                            value={detalle.key}
                            onChange={(e) =>
                              handleDetallesChange(
                                detalle.id,
                                "key",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div className="form-group detail-value">
                          <input
                            type="text"
                            placeholder="Valor"
                            value={detalle.value}
                            onChange={(e) =>
                              handleDetallesChange(
                                detalle.id,
                                "value",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        {detallesList.length > 1 && (
                          <button
                            type="button"
                            className="btn-remove"
                            onClick={() => handleRemoveDetalle(detalle.id)}
                          >
                            🗑️
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      className="btn-secondary add-detail-btn"
                      onClick={handleAddDetalle}
                    >
                      + Añadir Característica
                    </button>
                  </div>
                </div>

                <div className="column-right">
                  <div className="form-card">
                    <h3 className="card-title">Categoría y Visibilidad</h3>
                    <div className="form-group">
                      <label htmlFor="categoria">Categoría</label>
                      <input
                        type="text"
                        id="categoria"
                        name="categoria"
                        value={formData.categoria}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group checkbox-group">
                      <label className="checkbox-label">
                        Producto destacado
                        <input
                          type="checkbox"
                          name="destacado"
                          checked={formData.destacado}
                          onChange={handleChange}
                        />
                        <span className="custom-checkbox"></span>
                      </label>
                    </div>
                  </div>

                  <div className="form-card">
                    <h3 className="card-title">Imagen del Producto</h3>
                    <div className="form-group">
                      <label htmlFor="imagen">URL de la Imagen</label>
                      <input
                        type="text"
                        id="imagen"
                        name="imagen"
                        value={formData.imagen}
                        onChange={handleChange}
                        placeholder="https:// o /uploads/img.jpg"
                      />
                    </div>
                    {formData.imagen ? (
                      <div className="image-preview">
                        <img src={formData.imagen} alt="Vista previa" />
                      </div>
                    ) : (
                      <p className="upload-tip">Vista previa imagen</p>
                    )}
                  </div>
                </div>
              </div>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
};

export default EditarProducto;
