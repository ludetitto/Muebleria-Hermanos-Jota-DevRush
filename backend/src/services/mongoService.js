// Conexión a MongoDB usando Mongoose
const mongoose = require('mongoose');

class MongoService {
  static async connect() {
    try {
      await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/muebleria-hermanos-jota-devrush');
      console.log('Conectado a MongoDB');
    } catch (error) {
      console.error('Error conectando a MongoDB:', error);
      throw error;
    }
  }

  static async disconnect() {
    await mongoose.disconnect();
    console.log('Desconectado de MongoDB');
  }
}

module.exports = MongoService;