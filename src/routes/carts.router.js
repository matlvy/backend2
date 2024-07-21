import express from "express";
const router = express.Router();
import CartManager from "../dao/db/cart-manager-db.js";
const cartManager = new CartManager();
import CartModel from "../dao/models/cart.model.js";

// Crear un nuevo carrito:

router.post("/", async (req, res) => {
  try {
    const nuevoCarrito = await cartManager.crearCarrito();
    res.json(nuevoCarrito);
  } catch (error) {
    console.error("Error al crear un nuevo carrito", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Listar los productos que pertenecen a determinado carrito.

router.get("/:cid", async (req, res) => {
  const cartId = req.params.cid;

  try {
    const carrito = await CartModel.findById(cartId);

    if (!carrito) {
      console.log("No existe ese carrito con el id");
      return res.status(404).json({ error: "Carrito no encontrado" });
    }

    return res.json(carrito.products);
  } catch (error) {
    console.error("Error al obtener el carrito", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Agregar productos a distintos carritos.

router.post("/:cid/product/:pid", async (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;
  const quantity = req.body.quantity || 1;

  try {
    const actualizarCarrito = await cartManager.agregarProductoAlCarrito(
      cartId,
      productId,
      quantity
    );
    res.json(actualizarCarrito.products);
  } catch (error) {
    console.error("Error al agregar producto al carrito", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Eliminar carrito

router.delete("/:cid", async (req, res) => {
  const cartId = req.params.cid;
  const carritoEliminado = req.body;

  try {
    await cartManager.deleteCart(cartId, carritoEliminado);
    res.json({
      message: "carrito eliminado exitosamente",
    });
  } catch (error) {
    console.error("Error al eliminar carrito", error);
    res.status(500).json({
      error: "Error interno del servidor",
    });
  }
});

router.delete("/:cid/product/:pid", async (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;
  const quantity = req.body.quantity || 1;

  try {
    const actualizarCarrito = await cartManager.deleteProductCart(
      cartId,
      productId,
      quantity
    );
    res.json(actualizarCarrito.products);
  } catch (error) {
    console.error("Error al eliminar producto del carrito", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Actualizar carrito

router.put("/:cid", async (req, res) => {
  const cartId = req.params.cid;
  const carritoActualizado = req.body;

  try {
    await cartManager.updateCart(cartId, carritoActualizado);
    res.json({
      message: "carrito actualizado exitosamente",
    });
  } catch (error) {
    console.error("Error al actualizar carrito", error);
    res.status(500).json({
      error: "Error interno del servidor",
    });
  }
});

router.put("/:cid/product/:pid", async (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;
  const quantity = req.body.quantity || 1;

  try {
    const actualizarCarrito = await cartManager.updateProductCart(
      cartId,
      productId,
      quantity
    );
    res.json(actualizarCarrito.products);
  } catch (error) {
    console.error("Error al actualizar producto del carrito", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});
export default router;
