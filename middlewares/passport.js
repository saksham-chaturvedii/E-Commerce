const user = require("../models/user");
const { secret } = require("../config/index");
const { Strategy, ExtractJwt } = require("passport-jwt");

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret,
};
module.exports = (passport) => {
  passport.use(
    new Strategy(opts, async (payload, done) => {
      await user
        .findByPk(payload.user_id)
        .then((user) => {
          if (user) {
            return done(null, user);
          }
          // return done(null, false);
        })
        .catch((err) => {
          return done(null, false);
        });
    })
  );
};
