import CartModel from "../models/cart.model.js";

class CartManager {
  async crearCarrito() {
    try {
      const nuevoCarrito = new CartModel({ products: [] });
      await nuevoCarrito.save();
      return nuevoCarrito;
    } catch (error) {
      console.log("Error al crear el carrito de compras");
    }
  }

  async getCarritoById(cartId) {
    try {
      const carrito = await CartModel.findById(cartId);
      if (!carrito) {
        console.log("No existe ese carrito con el id");
        return null;
      }

      return carrito;
    } catch (error) {
      console.log("Error al traer el carrito", error);
    }
  }

  async agregarProductoAlCarrito(cartId, productId, quantity = 1) {
    try {
      const carrito = await this.getCarritoById(cartId);
      const existeProducto = carrito.products.find(
        (item) => item.product.toString() === productId
      );

      if (existeProducto) {
        existeProducto.quantity += quantity;
      } else {
        carrito.products.push({ product: productId, quantity });
      }

      //Marcar la propiedad "products" como modificada antes de guardar:
      carrito.markModified("products");

      await carrito.save();
      return carrito;
    } catch (error) {
      console.log("error al agregar un producto", error);
    }
  }
  async deleteCart(cartId, carritoEliminado) {
    try {
      const eliminado = await CartModel.findByIdAndDelete(
        cartId,
        carritoEliminado
      );

      if (!eliminado) {
        console.log("No se encuentra el carrito");
        return null;
      }

      console.log("carrito actualizado con exito");
      return eliminado;
    } catch (error) {
      console.log("Error al actualizar el carrito", error);
    }
  }
  async deleteProductCart(cartId, productId, quantity = 1) {
    try {
      const carrito = await this.getCarritoById(cartId);
      const existeProducto = carrito.products.find(
        (item) => item.product.toString() === productId
      );

      if (existeProducto) {
        existeProducto.quantity += quantity;
      } else {
        carrito.products.remove({ product: productId, quantity });
      }

      //Vamos a marcar la propiedad "products" como modificada antes de guardar:
      carrito.markModified("products");

      await carrito.save();
      return carrito;
    } catch (error) {
      console.log("error al eliminar el producto", error);
    }
  }
  async updateCart(cartId, carritoActualizado) {
    try {
      const updateado = await CartModel.findByIdAndUpdate(
        cartId,
        carritoActualizado
      );

      if (!updateado) {
        console.log("No se encuentra el carrito");
        return null;
      }

      console.log("carrito actualizado con exito");
      return updateado;
    } catch (error) {
      console.log("Error al actualizar el carrito", error);
    }
  }

  async updateProductCart(cartId, productId, quantity = 1) {
    try {
      const carrito = await this.getCarritoById(cartId);
      const existeProducto = carrito.products.find(
        (item) => item.product.toString() === productId
      );

      if (existeProducto) {
        existeProducto.quantity += quantity;
      } else {
        carrito.products.fill({ product: productId, quantity });
      }

      //Marcar la propiedad "products" como modificada antes de guardar:
      carrito.markModified("products");

      await carrito.save();
      return carrito;
    } catch (error) {
      console.log("error al actualizar el producto", error);
    }
  }
}

export default CartManager;
