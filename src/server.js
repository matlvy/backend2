import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";

const app = express();
const PORT = 5000;

// Express Config
app.use(
  session({
    secret: "s3cr3t",
    resave: true,
    saveUninitialized: true,
  })
);
//Session
app.get("/session", (req, res) => {
  console.log(req.session);
  if (req.session.counter) {
    req.session.counter++;
    res.send(`${req.session.counter}`);
  } else {
    req.session.counter = 1;
    res.send(`${req.session.counter}`);
  }
});
//Start Server
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
