/**
 * Middleware para respuestas consistentes
 * Agrega métodos helper a res para respuestas success y error
 */

const responseHandler = (req, res, next) => {
  // Método para respuestas exitosas
  res.success = (data = null, message = 'Success', statusCode = 200) => {
    const response = {
      success: true,
      message,
      timestamp: new Date().toISOString()
    };

    // Solo agregar data si no es null
    if (data !== null) {
      response.data = data;
    }

    res.status(statusCode).json(response);
  };

  // Método para respuestas de error
  res.error = (message = 'Error', statusCode = 500, details = null) => {
    const response = {
      success: false,
      error: getErrorType(statusCode),
      message,
      timestamp: new Date().toISOString()
    };

    // Solo agregar details si no es null
    if (details !== null) {
      response.details = details;
    }

    res.status(statusCode).json(response);
  };

  next();
};

/**
 * Determina el tipo de error basado en el código de estado
 */
const getErrorType = (statusCode) => {
  switch (statusCode) {
    case 400:
      return 'Bad Request';
    case 401:
      return 'Unauthorized';
    case 403:
      return 'Forbidden';
    case 404:
      return 'Not Found';
    case 409:
      return 'Conflict';
    case 422:
      return 'Validation Error';
    case 500:
      return 'Internal Server Error';
    case 503:
      return 'Service Unavailable';
    default:
      return 'Error';
  }
};

module.exports = responseHandler;