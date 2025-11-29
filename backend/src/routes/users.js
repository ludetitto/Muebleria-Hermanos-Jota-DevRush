const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const auth = require("../middleware/authMiddleware");
const User = require("../models/User");

// devuelve información del usuario autenticado
router.get("/me", auth, async (req, res, next) => {
  try {
    const userId = req.user && req.user.id;

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.error("ID de usuario inválido", 400);
    }

    const user = await User.findById(userId).select("-password").lean();

    if (!user) return res.error("Usuario no encontrado", 404);

    res.success(user, "Usuario obtenido exitosamente");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
