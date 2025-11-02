const express = require("express");
const mongoose = require('mongoose');
const router = express.Router();
const Product = require("../models/Product"); // importacion del modelo Mongoose

// GET todos los productos
router.get("/", async (req, res) => {
  try {
    const productos = await Product.find();
    res.json(productos);
  } catch (err) {
    next(err);
  }
});

// GET producto por ID
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    
    // Validar formato de ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.error('ID de producto inválido', 400);
    }
    
    const producto = await Product.findById(id).lean();
    
    if (!producto) {
      return res.error('Producto no encontrado', 404);
    }
    
    res.success(producto, 'Producto obtenido exitosamente');
  } catch (err) {
    next(err);
  }
});

// POST crear producto
router.post("/", async (req, res, next) => {
  try {
    // Validaciones básicas antes de crear
    const { nombre, precio } = req.body;
    
    if (!nombre || !nombre.trim()) {
      return res.error('El nombre del producto es obligatorio', 400);
    }
    
    if (!precio || precio <= 0) {
      return res.error('El precio debe ser mayor a 0', 400);
    }

    const nuevoProducto = new Product(req.body);
    const productoGuardado = await nuevoProducto.save();
    
    res.success(productoGuardado, 'Producto creado exitosamente', 201);
  } catch (err) {
    next(err);
  }
});

// PUT actualizar producto
router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    
    // Validar formato de ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.error('ID de producto inválido', 400);
    }
    
    // Validar que el precio siga siendo válido si se está actualizando
    if (req.body.precio !== undefined && req.body.precio <= 0) {
      return res.error('El precio debe ser mayor a 0', 400);
    }
    
    const productoActualizado = await Product.findByIdAndUpdate(
      id, 
      req.body, 
      { 
        new: true, 
        runValidators: true, // Ejecutar validaciones del esquema
        lean: true
      }
    );
    
    if (!productoActualizado) {
      return res.error('Producto no encontrado', 404);
    }
    
    res.success(productoActualizado, 'Producto actualizado exitosamente');
  } catch (err) {
    next(err);
  }
});

// DELETE eliminar producto
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    
    // Validar formato de ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.error('ID de producto inválido', 400);
    }
    
    const productoEliminado = await Product.findByIdAndDelete(id);
    
    if (!productoEliminado) {
      return res.error('Producto no encontrado', 404);
    }
    
    res.success(null, 'Producto eliminado exitosamente');
  } catch (err) {
    next(err);
  }
});
module.exports = router;
