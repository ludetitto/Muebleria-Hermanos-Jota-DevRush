const express = require("express");
const router = express.Router();
const { verifyJWT } = require("../middleware/authMiddleware");

const {
  register,
  login,
  getAuthUser,
} = require("../controllers/authController");

// Ruta de registro
router.post("/register", register);

// Ruta de login
router.post("/login", login);

// Ruta de usuario
router.get("/me", verifyJWT, getAuthUser);

// Verificar si un token es valido
router.post("/verify-token", verifyJWT, (req, res) => {
  res.json({
    ok: true,
    valid: true,
    user: req.user,
  });
});

module.exports = router;
