const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Product = require("../models/Product");
const { verifyJWT } = require("../middleware/authMiddleware");

router.get("/", verifyJWT, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("cart");

    if (!user) {
      return res.status(404).json({
        ok: false,
        error: "Usuario no encontrado",
      });
    }

    res.json({
      ok: true,
      cart: user.cart,
      total: user.getCartTotal(),
    });
  } catch (error) {
    console.error("Error al obtener carrito:", error);
    res.status(500).json({
      ok: false,
      error: "Error al obtener el carrito",
    });
  }
});

router.post("/add", verifyJWT, async (req, res) => {
  try {
    const { productId, cantidad = 1 } = req.body;

    if (!productId) {
      return res.status(400).json({
        ok: false,
        error: "El ID del producto es requerido",
      });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        ok: false,
        error: "Producto no encontrado",
      });
    }

    if (product.stock < cantidad) {
      return res.status(400).json({
        ok: false,
        error: "Stock insuficiente",
      });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        ok: false,
        error: "Usuario no encontrado",
      });
    }

    await user.addToCart({
      productId: product._id,
      nombre: product.nombre,
      precio: product.precio,
      imagen: product.imagen,
      descripcion: product.descripcion,
      cantidad: parseInt(cantidad),
    });

    res.json({
      ok: true,
      message: "Producto agregado al carrito",
      cart: user.cart,
      total: user.getCartTotal(),
    });
  } catch (error) {
    console.error("Error al agregar al carrito:", error);
    res.status(500).json({
      ok: false,
      error: "Error al agregar producto al carrito",
    });
  }
});

router.put("/update/:productId", verifyJWT, async (req, res) => {
  try {
    const { productId } = req.params;
    const { cantidad } = req.body;

    if (!cantidad || cantidad < 0) {
      return res.status(400).json({
        ok: false,
        error: "Cantidad inválida",
      });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        ok: false,
        error: "Usuario no encontrado",
      });
    }

    if (cantidad > 0) {
      const product = await Product.findById(productId);
      if (product && product.stock < cantidad) {
        return res.status(400).json({
          ok: false,
          error: "Stock insuficiente",
        });
      }
    }

    await user.updateCartItemQuantity(productId, parseInt(cantidad));

    res.json({
      ok: true,
      message: "Cantidad actualizada",
      cart: user.cart,
      total: user.getCartTotal(),
    });
  } catch (error) {
    console.error("Error al actualizar cantidad:", error);
    res.status(500).json({
      ok: false,
      error: "Error al actualizar cantidad",
    });
  }
});

router.delete("/remove/:productId", verifyJWT, async (req, res) => {
  try {
    const { productId } = req.params;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        ok: false,
        error: "Usuario no encontrado",
      });
    }

    await user.removeFromCart(productId);

    res.json({
      ok: true,
      message: "Producto eliminado del carrito",
      cart: user.cart,
      total: user.getCartTotal(),
    });
  } catch (error) {
    console.error("Error al eliminar del carrito:", error);
    res.status(500).json({
      ok: false,
      error: "Error al eliminar producto del carrito",
    });
  }
});

router.delete("/clear", verifyJWT, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        ok: false,
        error: "Usuario no encontrado",
      });
    }

    await user.clearCart();

    res.json({
      ok: true,
      message: "Carrito vaciado",
      cart: [],
      total: 0,
    });
  } catch (error) {
    console.error("Error al vaciar carrito:", error);
    res.status(500).json({
      ok: false,
      error: "Error al vaciar el carrito",
    });
  }
});

router.post("/sync", verifyJWT, async (req, res) => {
  try {
    const { items } = req.body;

    if (!Array.isArray(items)) {
      return res.status(400).json({
        ok: false,
        error: "Formato de carrito inválido",
      });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        ok: false,
        error: "Usuario no encontrado",
      });
    }

    user.cart = [];

    for (const item of items) {
      const product = await Product.findById(
        item.id || item.productId || item._id
      );

      if (product && product.stock >= item.cantidad) {
        await user.addToCart({
          productId: product._id,
          nombre: product.nombre,
          precio: product.precio,
          imagen: product.imagen,
          descripcion: product.descripcion,
          cantidad: parseInt(item.cantidad) || 1,
        });
      }
    }

    res.json({
      ok: true,
      message: "Carrito sincronizado",
      cart: user.cart,
      total: user.getCartTotal(),
    });
  } catch (error) {
    console.error("Error al sincronizar carrito:", error);
    res.status(500).json({
      ok: false,
      error: "Error al sincronizar el carrito",
    });
  }
});

module.exports = router;
