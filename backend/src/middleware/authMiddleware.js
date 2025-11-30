const jwt = require("jsonwebtoken");
const User = require("../models/User");

const verifyJWT = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        ok: false,
        error: "No se proporciono token de autenticación",
      });
    }

    const token = authHeader.split(" ")[1]; // 'Bearer <token>'

    //Decodificar token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({
          ok: false,
          error: "Token expirado. Por favor inicie sesion nuevamente",
        });
      }
      if (error.name === "JsonWebTokenError") {
        return res.status(401).json({
          ok: false,
          error: "Token invalido",
        });
      }
      throw error;
    }

    // Verificar que el usuario todavia existe. El token guarda { userId }
    const userId = decoded?.userId || decoded?.id || decoded?.user || null;
    if (!userId) {
      return res.status(401).json({ ok: false, error: "Token sin userId" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({ ok: false, error: "Usuario no encontrado" });
    }

    req.user = {
      id: user._id,
      nombre: user.nombre,
      email: user.email,
      role: user.role,
    };

    next();
  } catch (error) {
    console.error("Error en middleware de autenticacion:", error);
    return res.status(500).json({
      ok: false,
      error: "Error al verificar autenticacion",
    });
  }
};

//Opcional para rutas que no requieren autenticacion
const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next();
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (user) {
      req.user = {
        id: user._id,
        nombre: user.nombre,
        email: user.email,
      };
    }

    next();
  } catch (error) {
    next();
  }
};

module.exports = { verifyJWT, optionalAuth };
