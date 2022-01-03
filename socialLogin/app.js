const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const auth = require("./routes/auth");
const passportConfig = require("./passport/passport");
const passport = require("passport");
const app = express();

//connect to db.
mongoose.connect("mongodb://127.0.0.1:27017/passport", () => {
  console.log("DB connected");
});

app.use(
  cookieSession({
    keys: ["this is token key"],

    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);

app.use(passport.initialize());
app.use(passport.session());

const isLoggedIn = (req, res, next) => {
  if (!req.user) {
    return res.redirect("/auth/login");
  }
  next();
};

app.set("view engine", "ejs");

app.use("/auth", auth);

app.get("/", isLoggedIn, (req, res) => {
  res.render("home");
});

app.listen(3000, () => console.log("Server started on port 3000"));
