const User = require("../models/User");
const bcrypt = require("bcrypt");

const LocalStrategy = require("passport-local").Strategy;

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

module.exports = localStrategy;
