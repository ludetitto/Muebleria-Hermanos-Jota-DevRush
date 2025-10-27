const express = require("express");
const router = express.Router();
const Product = require("../models/Product"); // importacion del modelo Mongoose

// GET todos los productos
router.get("/", async (req, res) => {
  try {
    const productos = await Product.find();
    res.json(productos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener productos" });
  }
});

// GET producto por id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const producto = await Product.findById(id);
    if (!producto) return res.status(404).json({ error: "Producto no encontrado" });
    res.json(producto);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener el producto" });
  }
});

// POST crear producto
router.post("/", async (req, res) => {
  try {
    const nuevoProducto = new Product(req.body);
    const productoGuardado = await nuevoProducto.save();
    res.status(201).json(productoGuardado);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Error al crear producto" });
  }
});

// PUT actualizar producto
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const productoActualizado = await Product.findByIdAndUpdate(id, req.body, { new: true });
    res.json(productoActualizado);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Error al actualizar producto" });
  }
});

// DELETE eliminar producto
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.json({ mensaje: "Producto eliminado correctamente" });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Error al eliminar producto" });
  }
});
module.exports = router;
