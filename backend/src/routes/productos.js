const express = require("express");
const router = express.Router();
const Product = require("../models/Product"); // importamos el modelo Mongoose

const productos = require("../data/data");

router.get("/", (req, res, next) => {
  try {
    res.json(productos);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", (req, res, next) => {
  try {
    const { id } = req.params;
    const producto = productos.find((p) => String(p.id) === String(id));

    if (!producto) {
      return res
        .status(404)
        .json({ ok: false, error: "Producto no encontrado" });
    }

    res.json(producto);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
