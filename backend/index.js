require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

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

app.listen(PORT, () => console.log(`Server corriendo en: ${PORT}`));

app.use((req, res, next) => {
  res.status(404).json({ ok: false, error: "Ruta no encontrada" });
});

app.use((err, req, res, next) => {
  console.error("Error:", err.stack);
  res.status(500).json({ ok: false, error: "Error interno del servidor" });
});
