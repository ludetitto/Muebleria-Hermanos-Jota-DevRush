require('dotenv').config();

const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

// middleware de logging simple
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

//ruta de productos
const productosRouter = require("./src/routes/productos");
app.use("/api/productos", productosRouter);

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
