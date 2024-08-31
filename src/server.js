import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import passport from "passport";
import { initializePassport } from "./config/passport.config.js";
import routes from "./routes/index.js";
import { config } from "./config/config.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import userRoutes from "./routes/user.routes.js";

const app = express();
const PORT = 5000;

// Express config
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use("/api/users", userRoutes);

// Passport config
initializePassport();
app.use(passport.initialize());

// Mongo config
mongoose
  .connect(config.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log(error);
  });

// Routes
app.use("/api", routes);

app.use(errorHandler);

app.use("*", (req, res) => {
  res.status(404).json({
    message: "Page not found",
    error: "Not found",
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
