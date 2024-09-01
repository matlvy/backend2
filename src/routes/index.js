import {
  authenticate,
  authorizations,
} from "../middlewares/authorization.middleware.js";
import authRoutes from "./auth.routes.js";
import cartRoutes from "./cart.routes.js";
import productRoutes from "./products.routes.js";
import userRoutes from "./user.routes.js";
import { Router } from "express";
import ticketRoutes from "./ticket.routes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/cart", authenticate("jwt"), authorizations(["user"]), cartRoutes);
router.use("/products", productRoutes);
router.use(
  "/users",
  authenticate("jwt"),
  authorizations(["admin"]),
  userRoutes
);
router.use(
  "/ticket",
  authenticate("jwt"),
  authorizations(["user"]),
  ticketRoutes
);

export default router;
