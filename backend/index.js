require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;
const MongoService = require('./src/services/mongoService');

app.use(
  cors({
    origin: "http://localhost:3001", //url de app react
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// middleware de logging simple
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

//ruta de productos
const productosRouter = require("./src/routes/productos");
app.use("/api/productos", productosRouter);

// Servir el build de React
const fs = require("fs");
const path = require("path");
const clientBuildPath = path.join(__dirname, "..", "client", "build");
if (fs.existsSync(clientBuildPath)) {
  app.use(express.static(clientBuildPath));
  // Manejar rutas de React (SPA)
  app.use((req, res, next) => {
    if (req.method === "GET" && req.accepts && req.accepts("html")) {
      return res.sendFile(path.join(clientBuildPath, "index.html"));
    }
    next();
  });
}

// endpoint de prueba
/*app.get("/api/health", (req, res) => {
  res.json({ ok: true, msg: "backend arriba" });
});*/

// Middleware de manejo de errores (después de listen)
app.use((req, res, next) => {
  res.status(404).json({ ok: false, error: "Ruta no encontrada" });
});

app.use((err, req, res, next) => {
  console.error("Error:", err.stack);
  res.status(500).json({ ok: false, error: "Error interno del servidor" });
});

// Función para iniciar el servidor con conexión a MongoDB
async function startServer() {
  try {
    await MongoService.connect();
    app.listen(PORT, () => console.log(`Server corriendo en: ${PORT}`));
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
}

// Iniciar servidor
startServer();

// Manejar cierre graceful
process.on('SIGTERM', async () => {
  await MongoService.disconnect();
  process.exit(0);
});

process.on('SIGINT', async () => {
  await MongoService.disconnect();
  process.exit(0);
});