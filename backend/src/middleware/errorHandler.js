/**
 * Middleware de manejo centralizado de errores
 * Maneja diferentes tipos de errores de Mongoose y devuelve respuestas consistentes
 */

const errorHandler = (err, req, res, next) => {
  console.error('Error Stack:', err.stack);

  // Error de validación de Mongoose
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(error => ({
      field: error.path,
      message: error.message,
      value: error.value
    }));
    
    return res.status(400).json({
      success: false,
      error: 'Validation Error',
      message: 'Los datos enviados no son válidos',
      details: errors,
      timestamp: new Date().toISOString()
    });
  }

  // Error de cast (ID inválido)
  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      error: 'Invalid ID format',
      message: 'El ID proporcionado no tiene un formato válido',
      details: { field: err.path, value: err.value },
      timestamp: new Date().toISOString()
    });
  }

  // Error de duplicado (índices únicos)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    const value = err.keyValue[field];
    
    return res.status(400).json({
      success: false,
      error: 'Duplicate field',
      message: `Ya existe un registro con ese ${field}`,
      details: { field, value },
      timestamp: new Date().toISOString()
    });
  }

  // Error de conexión a MongoDB
  if (err.name === 'MongoNetworkError' || err.name === 'MongooseServerSelectionError') {
    return res.status(503).json({
      success: false,
      error: 'Database Connection Error',
      message: 'No se pudo conectar a la base de datos',
      timestamp: new Date().toISOString()
    });
  }

  // Error de documento no encontrado
  if (err.name === 'DocumentNotFoundError') {
    return res.status(404).json({
      success: false,
      error: 'Not Found',
      message: 'El recurso solicitado no existe',
      timestamp: new Date().toISOString()
    });
  }

  // Error por defecto (500)
  const statusCode = err.statusCode || 500;
  const message = process.env.NODE_ENV === 'production' 
    ? 'Error interno del servidor' 
    : err.message;

  res.status(statusCode).json({
    success: false,
    error: 'Internal Server Error',
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    timestamp: new Date().toISOString()
  });
};

module.exports = errorHandler;