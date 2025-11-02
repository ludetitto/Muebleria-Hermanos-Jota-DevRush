const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre del producto es obligatorio"],
      trim: true,
      maxlength: [100, "El nombre no puede exceder los 100 caracteres"],
    },
    descripcion: {
      type: String,
      default: "",
      trim: true,
      maxlength: [1000, "La descripcion no puede exceder los 1000 caracteres"],
    },
    precio: {
      type: Number,
      required: [true, "El precio es obligatorio"],
      min: [0, "El precio no puede ser negativo"],
    },
    stock: {
      type: Number,
      default: 0,
      min: [0, "El stock no puede ser negativo"],
    },
    imagen: {
      type: String,
      default: "",
      trim: true,
      validate: {
        validator: (v) => {
          //permitir strings vacios o urls validas o rutas relativas
          if (!v || v === "") return true;
          return /^(https?:\/\/.+|\/.*|\.\.?\/.*)$/i.test(v);
        },
        message: "La imagen debe ser una url valida o ruta relativa",
      },
    },
    categoria: {
      type: String,
      default: "",
      trim: true,
      maxlength: [50, "La categoria no puede exceder los 50 caracteres"],
    },
    destacado: {
      type: Boolean,
      default: false,
    },
    detalles: {
      //objeto flexible
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true, //created_at y update_at automatico
    versionKey: false,
  }
);

// Indices para mejorar el rendimiento de las consultas
ProductSchema.index({ nombre: 1 });
ProductSchema.index({ categoria: 1 });
ProductSchema.index({ destacado: 1 });
ProductSchema.index({ precio: 1 });

// Metodo virtual para obtener el ID como string
ProductSchema.virtual('id').get(function() {
  return this._id.toString();
});

// Configurar toJSON para incluir virtuals y eliminar campos innecesarios
ProductSchema.set('toJSON', {
  virtuals: true,
  transform: function(doc, ret) {
    delete ret._id;
    return ret;
  },
});

// Metodo estatico para buscar productos por categoria
ProductSchema.statics.findByCategoria = function(categoria) {
  return this.find({ categoria: categoria });
};

// Metodo estatico para buscar productos destacados
ProductSchema.statics.findDestacados = function() {
  return this.find({ destacado: true });
};

// Metodo de instancia para verificar disponibilidad de stock
ProductSchema.methods.hayStock = function(cantidad = 1) {
  return this.stock >= cantidad;
};

// Metodo de instancia para reducir stock
ProductSchema.methods.reducirStock = function(cantidad) {
  if (this.hayStock(cantidad)) {
    this.stock -= cantidad;
    return this.save();
  }
  throw new Error('Stock insuficiente');
};

// Exportar el modelo
module.exports = mongoose.model('Product', ProductSchema);