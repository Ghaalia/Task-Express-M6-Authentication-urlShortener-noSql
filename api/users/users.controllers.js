const User = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const hashedPassword = async (password) => {
  const newHashedPassword = await bcrypt.hash(password, 10);
  return newHashedPassword;
};

const generateToken = (user) => {
  const payload = {
    _id: user._id,
    username: user.username,
  };

  const token = jwt.sign(payload, process.env.JWT_PRIVATE, {
    expiresIn: process.env.JWT_TOKEN_EXP,
  });

  return token;
};

exports.signup = async (req, res, next) => {
  try {
    req.body.password = await hashedPassword(req.body.password);
    const newUser = await User.create(req.body);
    const token = generateToken(newUser);

    res.status(201).json({ token });
  } catch (err) {
    next(err);
  }
};

exports.signin = async (req, res) => {
  try {
  } catch (err) {
    res.status(500).json("Server Error");
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().populate("urls");
    res.status(201).json(users);
  } catch (err) {
    next(err);
  }
};
