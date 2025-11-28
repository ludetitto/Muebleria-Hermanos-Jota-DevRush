const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const { verifyJWT } = require("../middleware/authMiddleware");

// Crear un pedido
router.post("/", verifyJWT, async (req, res) => {
  try {
    const { items, total } = req.body;

    if (!items || items.length === 0) {
      return res.error("El pedido no tiene productos");
    }

    const order = await Order.create({
      user: req.user.id,
      items,
      total,
    });

    res.success(order, "Pedido creado correctamente");
  } catch (error) {
    res.error(error.message);
  }
});

// Obtener todos los pedidos del usuario logueado
router.get("/", verifyJWT, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    res.success(orders);
  } catch (error) {
    res.error(error.message);
  }
});

module.exports = router;
