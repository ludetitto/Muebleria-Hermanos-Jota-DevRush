const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre es requerido"],
      trim: true,
    },
    descripcion: {
      type: String,
      required: [true, "La descripción es requerida"],
    },
    precio: {
      type: Number,
      required: [true, "El precio es requerido"],
      min: [0, "El precio no puede ser negativo"],
    },
    imagen: {
      type: String,
      required: [true, "La imagen es requerida"],
    },
    destacado: {
      type: Boolean,
      default: false,
    },
    detalles: {
      materiales: String,
      dimensiones: String,
      color: String,
      peso: String,
    },
    stock: {
      type: Number,
      default: 0,
      min: [0, "El stock no puede ser negativo"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
