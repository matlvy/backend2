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
    res.send(`visitas: ${req.session.counter}`);
  } else {
    req.session.counter = 1;
    res.send(`welcome`);
  }
});
app.get("/login", (req, res) => {
  const { username, password } = req.query;

  if (username !== "admin" || password !== "1234") {
    return res.status(401).send("Invalid username or password");
  }

  req.session.username = username;
  req.session.admin = true;
  res.send("Login success");
});

app.get("/profile", auth, (req, res) => {
  res.send(`Welcome ${req.session.username}`);
});

app.get("/logout", (req, res) => {
  req.session.destroy();
  res.send("Sesión cerrada");
});

// middlewares/auth.middleware.js
function auth(req, res, next) {
  if (!req.session.username) {
    return res.status(401).send("You need to login first");
  }

  if (req.session.username === "admin" && req.session?.admin) {
    return next();
  }
  res.status(401).send("You need to be an admin");
}

//Start Server
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
