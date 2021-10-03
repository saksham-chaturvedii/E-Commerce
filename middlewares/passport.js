const User = require("../models/user");
const { SECRET } = require("../config");
const { Strategy, ExtractJwt } = require("passport-jwt");

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET,
};

module.exports = (passport) => {
  passport.use(
    new Strategy(opts, async (payload, done) => {
      // console.log("Payload-> ",payload);
      await User.findOne({ where: { email: payload.email } })
        .then((user) => {
          // console.log("User->", user.dataValues);
          if (user) {
            return done(null, user.dataValues);
          }
          return done(null, false);
        })
        .catch((err) => {
          return done(null, false);
        });
    })
  );
};
