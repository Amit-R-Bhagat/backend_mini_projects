const express = require("express");
const passport = require("passport");
const router = express.Router();

router.route("/login").get((req, res) => {
  res.render("login");
});

router.route("/logout").get((req, res) => {
  req.logout();
  res.redirect("/auth/login");
});

router.route("/google").get(
  passport.authenticate("google", {
    scope: ["profile", "email"],
  }),
  (req, res) => {
    res.send("login");
  }
);

router
  .route("/google/callback")
  .get(passport.authenticate("google"), (req, res) => {
    res.send(req.user);
  });

module.exports = router;
