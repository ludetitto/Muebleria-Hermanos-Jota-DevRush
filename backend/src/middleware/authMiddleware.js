// backend/src/middleware/authMiddleware.js
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const token = req.headers["authorization"];

    if (!token) {
        return res.status(401).json({ message: "Acceso denegado. No se proporcionó token." });
    }

    try {
        const tokenPart = token.split(" ")[1]; // Bearer xyz
        const decoded = jwt.verify(tokenPart, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.error("Error al verificar token:", error);
        return res.status(403).json({ message: "Token inválido" });
    }
};
