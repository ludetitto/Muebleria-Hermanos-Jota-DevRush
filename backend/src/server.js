const express = require("express");
const dotenv = require("dotenv");
const MongoService = require("./services/mongoService");
const productoRoutes = require("./routes/productos");

dotenv.config();
const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Conexión a MongoDB
MongoService.connect();

// Rutas
app.use("/api/productos", productoRoutes);

// Ruta base
app.get("/", (req, res) => {
  res.send("API Mueblería Hermanos Jota funcionando");
});

// Servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
