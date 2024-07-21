import mongoose from "mongoose";
mongoose
  .connect(
    "mongodb+srv://mattlevyprg:coderhouse@cluster0.0nikfi0.mongodb.net/ecommerce"
  )
  .then(() => console.log("conexion exitosa"))
  .catch((error) => console.log("tenemos un error", error));
