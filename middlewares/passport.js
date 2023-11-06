const User = require("../models/User");
const bcrypt = require("bcrypt");
require("dotenv").config();

const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = require("passport-jwt").Strategy;
const { fromAuthHeaderAsBearerToken } = require("passport-jwt").ExtractJwt;

const localStrategy = new LocalStrategy(
  { usernameField: "username" },
  async (username, password, done) => {
    try {
      const user = await User.findOne({ username: username });
      if (!user) return done({ message: "Username Or Password is wrong !!" });
      const passwordsMatch = await bcrypt.compare(password, user.password);
      if (!passwordsMatch)
        return done({ message: "Username Or Password is wrong !!" });

      return done(null, user);
    } catch (error) {
      done(error);
    }
  }
);

const jwtStrategy = new JWTStrategy(
  {
    jwtFromRequest: fromAuthHeaderAsBearerToken,
    secretOrKey: process.env.JWT_PRIVATE,
  },
  async (payload, done) => {
    try {
      if (Date.now() / 1000 > payload.exp) return done(null, false);
      const user = User.findById(payload._id);
      if (!user) return done(null, false);

      return done(null, user);
    } catch (error) {
      done(error);
    }
  }
);

module.exports = { localStrategy, jwtStrategy };
