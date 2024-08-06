import mongoose from "mongoose";
mongoose
  .connect("mongodb://localhost:27017/preentrega1")
  .then(() => console.log("conexion exitosa"))
  .catch((error) => console.log("tenemos un error", error));
