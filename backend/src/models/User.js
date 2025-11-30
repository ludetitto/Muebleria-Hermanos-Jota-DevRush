const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre es requerido"],
      trim: true,
      minlength: [2, "El nombre debe tener al menos 2 caracteres"],
      maxlength: [50, "El nombre no puede exceder 50 caracteres"],
    },
    email: {
      type: String,
      required: [true, "El email es requerido"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Por favor ingrese un email válido"],
    },
    password: {
      type: String,
      required: [true, "La contraseña es requerida"],
      minlength: [6, "La contraseña debe tener al menos 6 caracteres"],
      select: false,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    cart: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        nombre: { type: String, required: true },
        precio: { type: Number, required: true },
        imagen: { type: String },
        descripcion: { type: String },
        cantidad: {
          type: Number,
          required: true,
          min: [1, "La cantidad mínima es 1"],
          default: 1,
        },
        addedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error("Error al comparar contraseñas");
  }
};

// Métodos del carrito
userSchema.methods.addToCart = function (productData) {
  const existingItemIndex = this.cart.findIndex(
    (item) => item.productId.toString() === productData.productId.toString()
  );

  if (existingItemIndex >= 0) {
    this.cart[existingItemIndex].cantidad += productData.cantidad || 1;
  } else {
    this.cart.push({
      productId: productData.productId,
      nombre: productData.nombre,
      precio: productData.precio,
      imagen: productData.imagen,
      descripcion: productData.descripcion,
      cantidad: productData.cantidad || 1,
    });
  }

  return this.save();
};

userSchema.methods.updateCartItemQuantity = function (productId, cantidad) {
  const itemIndex = this.cart.findIndex(
    (item) => item.productId.toString() === productId.toString()
  );

  if (itemIndex >= 0) {
    if (cantidad <= 0) {
      this.cart.splice(itemIndex, 1);
    } else {
      this.cart[itemIndex].cantidad = cantidad;
    }
  }

  return this.save();
};

userSchema.methods.removeFromCart = function (productId) {
  this.cart = this.cart.filter(
    (item) => item.productId.toString() !== productId.toString()
  );
  return this.save();
};

userSchema.methods.clearCart = function () {
  this.cart = [];
  return this.save();
};

userSchema.methods.getCartTotal = function () {
  return this.cart.reduce((total, item) => {
    return total + item.precio * item.cantidad;
  }, 0);
};

userSchema.methods.toPublicJSON = function () {
  return {
    id: this._id,
    nombre: this.nombre,
    role: this.role,
    email: this.email,
    createdAt: this.createdAt,
    cart: this.cart,
  };
};

module.exports = mongoose.model("User", userSchema);
