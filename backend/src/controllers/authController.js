const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

//Registro de usuario
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "El email ya está registrado" });
    }

    //Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashedPassword });

    res.status(201).json({
      message: "Usuario registrado",
      user: { id: user._id, name, email },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Credenciales incorrectas" });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid)
      return res.status(400).json({ message: "Credenciales incorrectas" });

    //Creacion de token JWT para que se mantenga la sesion del usuario
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login exitoso",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
