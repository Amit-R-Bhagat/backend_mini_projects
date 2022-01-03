const passport = require("passport");
const User = require("../model/user");
let GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      // clientID:
      //   "252886836335-1gstagd0qn1b6oiamf4ir2q5nefr3ge3.apps.googleusercontent.com",
      // clientSecret: "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",
      // callbackURL: "http://www.example.com/auth/google/callback",
      // callbackURL: "http://localhost:3000/auth/google/callback",
    },
    (accessToken, refreshToken, profile, next) => {
      //   console.log("My profile", profile._json.email);
      User.findOne({ email: profile._json.email }).then((user) => {
        if (user) {
          //   console.log("user already exists in db", user);
          next(null, user);
        } else {
          User.create({
            name: profile.displayName,
            googleId: profile.id,
            email: profile._json.email,
          })
            .then((user) => {
              console.log("New user", user);
              next(null, user);
            })
            .catch((err) => console.log(err));
        }
      });

      //   next();
    }
  )
);
