const passport = require("passport");
const { User } = require("../Models/User");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (id, cb) {
  User.findById(id).then(function (user) {
    cb(null, user);
  });
});


passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret:process.env.CLIENT_SECRET,
      callbackURL: `${process.env.SERVER_URL}/auth/google/callback`,
      scope: ["profile", "email"],
    },
    async function (accessToken, refreshToken, profile, cb) {
      try {
        //check if user exist
        const existingUser = await User.findOne({ googleId: profile.id });
        if (existingUser) {
          return cb(null, existingUser);
        } else {
          console.log("creating new user");
          const newUserInfo = {
            name: profile.name.givenName,
            email: profile.emails[0].value,
            isGoogleLogin: true,
            googleId: profile.id,
          };
          const newUser = await User.create(newUserInfo);
          return cb(null, newUser);
        }
      } catch (error) {
        return cb(error, false);
      }
    }
  )
);

module.exports = passport;
