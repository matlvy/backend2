import express from "express";
import mongoose from "mongoose";
import routes from "./routes/index.routes.js";

const app = express();
const PORT = 5000;

// Express Config
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Mongoose Config
mongoose
  .connect("mongodb://localhost:27017/backend2_0")
  .then(() => console.log("mongodb connected"))
  .catch((error) => console.log(error));

//Routes Config
app.use("/api", routes);
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
