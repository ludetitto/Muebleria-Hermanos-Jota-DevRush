const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

const generateToken = (userId) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error(
      "JWT secret no está definido en las variables de entorno."
    );
  }

  return jwt.sign({ userId }, secret, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
};

//Registro de usuario
exports.register = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    if (!nombre || !email || !password) {
      return res.status(400).json({
        ok: false,
        error: "Por favor complete todos los campos",
      });
    }

    //validar longitud de contraseña
    if (password.length < 6) {
      return res.status(400).json({
        ok: false,
        error: "La contraseña debe tener al menos 6 caracteres",
      });
    }

    const exists = await User.findOne({ email: email.toLowerCase() });
    if (exists) {
      return res
        .status(400)
        .json({ ok: false, message: "El email ya está registrado" });
    }

    //el password se hashea en modelo User
    const user = await User.create({
      nombre: nombre.trim(),
      email: email.toLowerCase().trim(),
      password,
    });

    await user.save();

    const token = generateToken(user._id);

    res.status(201).json({
      ok: true,
      message: "Usuario registrado con exito",
      user: user.toPublicJSON(),
      token,
    });
  } catch (error) {
    console.error("Error en registro:", error);

    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        ok: false,
        error: messages.join(""),
      });
    }

    res.status(500).json({ ok: false, message: error.message });
  }
};

//Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        ok: false,
        error: "Por favor ingrese email y contraseña",
      });
    }

    //Incluir contraseña en select al buscar usuario
    const user = await User.findOne({ email: email.toLowerCase() }).select(
      "+password"
    );

    if (!user) {
      return res
        .status(401)
        .json({ ok: false, message: "Credenciales incorrectas" });
    }

    const isValid = await user.comparePassword(password);

    if (!isValid)
      return res
        .status(401)
        .json({ ok: false, error: "Credenciales incorrectas" });

    //Creacion de token JWT para que se mantenga la sesion del usuario
    const token = generateToken(user._id);

    res.json({
      ok: true,
      message: "Login exitoso",
      token,
      user: user.toPublicJSON(),
    });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ ok: false, error: "Error al iniciar sesion" });
  }
};

//Datos de usuario autenticado
exports.getAuthUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        ok: false,
        error: "Usuario no encontrado",
      });
    }

    res.json({
      ok: true,
      user: user.toPublicJSON(),
    });
  } catch (error) {
    console.error("Error en /me:", error);
    res.status(500).json({
      ok: false,
      error: "Error al obtener informacion del usuario",
    });
  }
};
