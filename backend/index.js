require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;
const MongoService = require('./src/services/mongoService');

// Middlewares personalizados
const responseHandler = require('./src/middleware/responseHandler');
const errorHandler = require('./src/middleware/errorHandler');

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Middleware de respuestas consistentes
app.use(responseHandler);

// Middleware de logging mejorado
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.url;
  const userAgent = req.get('User-Agent') || 'Unknown';
  
  console.log(`${timestamp} - ${method} ${url} - ${userAgent}`);
  
  // Logging del body para POST/PUT (sin mostrar datos sensibles)
  if (['POST', 'PUT', 'PATCH'].includes(method) && req.body) {
    const bodyLog = { ...req.body };
    // Ocultar campos sensibles si los hubiera
    if (bodyLog.password) bodyLog.password = '[HIDDEN]';
    console.log('Body:', JSON.stringify(bodyLog, null, 2));
  }
  
  next();
});

//Rutas de la API
const productosRouter = require("./src/routes/productos");
app.use("/api/productos", productosRouter);

// Endpoint de debug temporal para verificar colecciones
app.get("/api/debug/collections", async (req, res) => {
  try {
    const mongoose = require('mongoose');
    const collections = await mongoose.connection.db.listCollections().toArray();
    res.json({
      database: mongoose.connection.name,
      collections: collections.map(c => c.name),
      connectionState: mongoose.connection.readyState
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.success({
    status: 'OK',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    version: process.env.npm_package_version || '1.0.0'
  }, 'API funcionando correctamente');
});

// Ruta base simple (como en server.js)
app.get("/", (req, res) => {
  res.send("API Mueblería Hermanos Jota funcionando");
});

// Servir el build de React
const fs = require("fs");
const path = require("path");
const clientBuildPath = path.join(__dirname, "..", "client", "build");
if (fs.existsSync(clientBuildPath)) {
  console.log(`Sirviendo archivos estáticos desde: ${clientBuildPath}`);
  app.use(express.static(clientBuildPath));
  
  // Manejar rutas de React (SPA)
  app.use((req, res, next) => {
    // Si es una petición a la API, no manejarla aquí
    if (req.url.startsWith('/api/')) {
      return next();
    }
    
    // Si acepta HTML, servir index.html de React
    if (req.accepts && req.accepts('html')) {
      return res.sendFile(path.join(clientBuildPath, "index.html"));
    }
    
    // Si no acepta HTML, continuar al siguiente middleware
    next();
  });
} else {
  console.log('Build de React no encontrado. Solo API disponible.');
}

app.use((req, res, next) => {
  res.status(404).json({ 
    success: false, 
    error: 'Not Found',
    message: 'La ruta solicitada no existe',
    path: req.originalUrl
  });
});

// Middleware de manejo de errores
app.use(errorHandler);

// Función para iniciar el servidor con conexión a MongoDB
async function startServer() {
  try {
    console.log('Conectando a MongoDB...');
    await MongoService.connect();
    
    app.listen(PORT, () => {
      console.log('========================================');
      console.log(`Servidor iniciado en puerto ${PORT}`);
      console.log(`API: http://localhost:${PORT}/api`);
      console.log(`Health: http://localhost:${PORT}/api/health`);
      console.log(`Productos: http://localhost:${PORT}/api/productos`);
      console.log(`Frontend: http://localhost:${PORT}`);
      console.log('========================================');
    });
  } catch (error) {
    console.error('Error al iniciar servidor:', error);
    process.exit(1);
  }
}
startServer();