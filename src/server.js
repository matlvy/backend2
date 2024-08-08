import express from "express";
import exphbs from "express-handlebars";
import "./database.js";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js";
import mongoose from "mongoose";
import morgan from "morgan";
import passport from "passport";
import authRoutes from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import { initializePassport } from "./config/passport.config.js";

const app = express();
const PORT = 5000;

// Express config
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./src/public"));
app.use(morgan("dev"));
app.use(cookieParser());

//Handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

// Routes config
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);
app.use("/api/auth", authRoutes);

// Passport Config
initializePassport();
app.use(passport.initialize());

// Mongoose Config
mongoose
  .connect("mongodb://localhost:27017/preentrega1")
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log(error));

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
