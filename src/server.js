import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import FileStore from "session-file-store";

const fileStorage = FileStore(session);

const app = express();
const PORT = 5000;

// Express Config
app.use(cookieParser());
app.use(
  session({
    store: new fileStorage({ path: "./sessions", ttl: 10000 }),
    secret: "s3cr3t",
    resave: false,
    saveUninitialized: false,
  })
);
//Routes
app.get("/session", (req, res) => {
  console.log(req.session);
  if (req.session.counter) {
    req.session.counter++;
    res.send(`visitas: ${req.session.counter}`);
  } else {
    req.session.counter = 1;
    res.send(`welcome`);
  }
});

//Start Server
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
