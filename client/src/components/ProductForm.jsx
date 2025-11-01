import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/productForm.css"; 

const ProductForm = ({ onSubmit }) => {
    const navigate = useNavigate(); 
    
    // Estado Principal del Formulario
    const [formData, setFormData] = useState({
        nombre: "",
        descripcion: "",
        precio: "",
        stock: "",
        imagen: "",
        categoria: "",
        destacado: false,
    });

    // (Clave/Valor)
    const [detallesList, setDetallesList] = useState([
        { id: Date.now(), key: '', value: '' } // campo vacío
    ]); 

    const [isSubmitting, setIsSubmitting] = useState(false); 

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    // FUNCIONES para manejar los DETALLES DINÁMICOS
    const handleDetallesChange = (id, field, value) => {
        setDetallesList(detallesList.map(item => 
            item.id === id ? { ...item, [field]: value } : item
        ));
    };

    const handleAddDetalle = () => {
        // Añade 
        setDetallesList([
            ...detallesList, 
            { id: Date.now(), key: '', value: '' }
        ]);
    };

    const handleRemoveDetalle = (id) => {
        setDetallesList(detallesList.filter(item => item.id !== id));
    };
    
    // FUNCIÓN DE ENVÍO ASÍNCRONA 
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (isSubmitting) return; 
        setIsSubmitting(true); 

        //  ENSAMBLAR EL OBJETO DETALLES
        let detallesObjeto = {};
        detallesList.forEach(item => {
            const trimmedKey = item.key.trim();
            const trimmedValue = item.value.trim();
            
            if (trimmedKey) {
                 // convertir a número/booleano 
                let finalValue = trimmedValue;
                if (!isNaN(parseFloat(finalValue)) && isFinite(finalValue) && finalValue !== '') {
                    finalValue = Number(finalValue);
                } else if (finalValue.toLowerCase() === 'true') {
                    finalValue = true;
                } else if (finalValue.toLowerCase() === 'false') {
                    finalValue = false;
                }
                
                detallesObjeto[trimmedKey] = finalValue;
            }
        });

        //  Preparar el objeto de datos final 
        const productoData = {
            nombre: formData.nombre,
            descripcion: formData.descripcion,
            // Convertir a número 
            precio: parseFloat(formData.precio) || 0,
            stock: parseInt(formData.stock, 10) || 0,
            imagen: formData.imagen,
            categoria: formData.categoria,
            destacado: formData.destacado,
            detalles: detallesObjeto, 
        };

        try {
            //  petición POST
            const response = await fetch('/api/productos', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productoData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || errorData.message || 'Fallo en la creación del producto.');
            }

            //  Mostrar mensaje y Redirigir
            const newProduct = await response.json();
            alert(" Producto creado exitosamente!");
            
            // Redirige usando el ID del nuevo producto
            if (newProduct._id) {
                navigate(`/catalogo/${newProduct._id}`); 
            } else {
                navigate('/catalogo');
            }
            
            if (onSubmit) onSubmit(productoData); 

        } catch (error) {
            console.error("Error al enviar el formulario:", error);
            alert(` Error al guardar el producto: ${error.message}`);
        } finally {
            setIsSubmitting(false); 
        }
    };

    return (
        // Contenedor principal del formulario
        <form className="product-page-content" onSubmit={handleSubmit}>
            
            {/* HEADER */}
            <div className="product-page-header">
                <h1 className="page-title">Nuevo Producto</h1>
                <div className="header-actions">
                    <button 
                        type="submit" 
                        className="btn-primary"
                        disabled={isSubmitting} // Deshabilita durante el envío
                    >
                        {isSubmitting ? 'Guardando...' : 'Guardar producto'}
                    </button>
                </div>
            </div>

            {/* CONTENEDOR PRINCIPAL */}
            <div className="form-columns-container">
                
                <div className="column-left">

                    {/* Información Básica */}
                    <div className="form-card">
                        <h3 className="card-title">Información Principal</h3>
                        
                        {/* NOMBRE */}
                        <div className="form-group" >
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

                        {/* DESCRIPCIÓN */}
                        <div className="form-group" >
                            <label htmlFor="descripcion">Descripción</label>
                            <textarea
                                id="descripcion"
                                name="descripcion"
                                value={formData.descripcion}
                                onChange={handleChange}
                                placeholder="Describe el producto..."
                                maxLength="1000"
                            />
                        </div>
                        
                        {/* PRECIO y STOCK en línea */}
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
                                />
                            </div>
                        </div>

                    </div>
                    
                    {/* TARJETA 2: Detalles Dinámicos */}
                    <div className="form-card">
                        <h3 className="card-title">Detalles Técnicos y Características</h3>

                        {detallesList.map((detalle) => (
                            <div key={detalle.id} className="inline-group detail-item">
                                {/* Nombre de la Característica*/}
                                <div className="form-group detail-key">
                                    <input
                                        type="text"
                                        placeholder="Característica (Ej: Color)"
                                        value={detalle.key}
                                        onChange={(e) => handleDetallesChange(detalle.id, 'key', e.target.value)}
                                    />
                                </div>
                                {/* Valor */}
                                <div className="form-group detail-value">
                                    <input
                                        type="text"
                                        placeholder="Valor (Ej: Rojo o 5 kg)"
                                        value={detalle.value}
                                        onChange={(e) => handleDetallesChange(detalle.id, 'value', e.target.value)}
                                    />
                                </div>
                                {/* Botón Eliminar (Visible solo si hay más de un campo) */}
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
                        
                        {/* Botón para Añadir un nuevo par */}
                        <button type="button" className="btn-secondary add-detail-btn" onClick={handleAddDetalle}>
                            + Añadir Característica
                        </button>
                    </div>
                </div>

                {/* COLUMNA DERECHA: Visibilidad e Imagen */}
                <div className="column-right">
                    
                    {/* Configuración y Categoría */}
                    <div className="form-card">
                        <h3 className="card-title">Categoría y Visibilidad</h3>
                        
                        {/* CATEGORÍA */}
                        <div className="form-group">
                            <label htmlFor="categoria">Categoría</label>
                            <input
                                type="text"
                                id="categoria"
                                name="categoria"
                                value={formData.categoria}
                                onChange={handleChange}
                                placeholder="Ej: Sillas, Mesas..."
                            />
                        </div>

                        {/* DESTACADO? */}
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
                    
                    {/* URL/imagen */}
                    <div className="form-card">
                        <h3 className="card-title">Imagen del Producto</h3>

                        {/* IMAGEN (URL) */}
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

                        {/* PREVIEW DE IMAGEN */}
                        {formData.imagen ? (
                            <div className="image-preview">
                                <img src={formData.imagen} alt="Vista previa" />
                            </div>
                        ) : (
                            <p className="upload-tip">La imagen se mostrará aquí después de ingresar la URL.</p>
                        )} 
                    </div>
                </div>
            </div>
        </form>
    );
};
export default ProductForm;