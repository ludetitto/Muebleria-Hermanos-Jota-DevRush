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
