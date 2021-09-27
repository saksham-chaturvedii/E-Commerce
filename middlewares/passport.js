const User = require("../models/user");
const { secret } = require("../config/index");
const { Startegy, ExtractJwt } = require("passport-jwt");

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret,
};

const passport = passport.use(
  new Startegy(opts, async (payload, done) => {
    await User.findById(payload.user_id)
      .then((user) => {
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      })
      .catch((err) => {
        return done(null, false);
      });
  })
);
module.exports = passport;
