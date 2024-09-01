import { Router } from "express";
import { cartModel } from "../models/cart.model.js";
import { productModel } from "../models/product.model.js";
import { userModel } from "../models/user.model.js";
import { validate } from "../middlewares/validation.middleware.js";
import { cartDto } from "../dtos/cart.dto.js";
import { uuid } from "uuidv4";
import { CartController } from "../controller/cart.controller.js";
import { ticketModel } from "../models/ticket.model.js";
import { ticketController } from "../controller/ticket.controller.js";

const router = Router();

router.get("/", ticketController.getAll);
router.get("/:id", ticketController.getById);
router.get("/users/:userId", ticketController.getByUserId);

export default router;
