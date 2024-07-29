import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";
import session from "express-session";
import handlebars from "express-handlebars";
import path from "path";
import __dirname from "./dirname.js";
import viewsRoutes from "./routes/views.routes.js";
import sessionRoutes from "./routes/session.routes.js";

const app = express();
const PORT = 5000;

// Express Config
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//Session con MongoStore
app.use(
  session({
    secret: "s3cr3t",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
      mongoUrl: "mongodb://localhost:27017/backend2_3",
      ttl: 60,
    }),
  })
);
//Mongoose Config
mongoose
  .connect("mongodb://localhost:27017/backend2_3")
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log(error));

//Handlebars Config
app.engine(
  "hbs",
  handlebars.engine({
    extname: "hbs",
    defaultLayout: "main",
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

//Routes Config
app.use("/", viewsRoutes);
app.use("/api/sessions", sessionRoutes);

//Start Server
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
