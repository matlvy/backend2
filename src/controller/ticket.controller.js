import { v4 as uuid } from "uuid";
import { cartModel } from "../models/cart.model.js";
import { productModel } from "../models/product.model.js";
import { ProductsService } from "../services/products.service.js";
import { ticketModel } from "../models/ticket.model.js";
import ticketRoutes from "../routes/ticket.routes.js";

export class ticketController {
  static async getAll(req, res) {
    try {
      const tickets = await ticketModel.find();
      res.json(tickets);
    } catch (error) {
      res.status(500).json({
        error: "An error has occurred while obtaining the tickets",
        details: error.message,
      });
    }
  }
  static async getById(req, res) {
    try {
      const { id } = req.params;
      const ticket = await ticketModel.findById(id);
      res.json(ticket);
    } catch (error) {
      res
        .status(500)
        .json({ error: "The ticket cannot be found", details: error.message });
    }
  }
}
