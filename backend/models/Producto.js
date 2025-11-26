import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String },
  precio: { type: Number, required: true },
  stock: { type: Number },
  imagenUrl: { type: String }
});

const Product = mongoose.model("Product", productSchema);
export default Product;
