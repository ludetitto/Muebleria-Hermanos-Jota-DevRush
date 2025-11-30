const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const User = require("../models/User");
const { verifyJWT } = require("../middleware/authMiddleware");

// Crear un pedido
router.post("/", verifyJWT, async (req, res) => {
  try {
    const { items, total } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({
        ok: false,
        error: "El pedido no tiene productos",
      });
    }

    const order = await Order.create({
      user: req.user.id,
      items,
      total,
    });

    //vaciar carrito despues de crear pedido
    const user = await User.findById(req.user.id);
    if (user) {
      await user.clearCart();
    }

    res.status(201).json({
      ok: true,
      message: "Pedido creado correctamente",
      data: order,
    });
  } catch (error) {
    console.error("Error al crear pedido:", error);
    res.status(500).json({
      ok: false,
      error: error.message || "Error al crear el pedido",
    });
  }
});

// Obtener todos los pedidos del usuario logueado
router.get("/", verifyJWT, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    res.json({
      ok: true,
      data: orders,
    });
  } catch (error) {
    console.error("Error al obtener pedidos:", error);
    res.status(500).json({
      ok: false,
      error: error.message || "Error al obtener pedidos",
    });
  }
});

//Obtener un pedido especifico
router.get("/:id", verifyJWT, async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!order) {
      return res.status(404).json({
        ok: false,
        error: "Pedido no encontrado",
      });
    }

    res.json({
      ok: true,
      data: order,
    });
  } catch (error) {
    console.error("Error al obtener pedido:", error);
    res.status(500).json({
      ok: false,
      error: error.message || "Error al obtener el pedido",
    });
  }
});

module.exports = router;
