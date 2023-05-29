const crypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const BadRequest = require("../errors/BadRequest");
const Conflict = require("../errors/Conflict");
const {
  BAD_REQUEST_VALIDATION_ERROR,
  CONFLICT_ERROR,
  WRONG_DATA_RESPONSE,
  SUCCESS_LOGIN,
} = require("../utils/constants");
const Forbidden = require("../errors/Forbidden");

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.postProfile = async (req, res, next) => {
  const { email, password, name } = req.body;
  try {
    const hashedPassword = await crypt.hash(password, 5);
    const response = await User.create({
      email,
      name,
      password: hashedPassword,
    });
    res.send(response);
  } catch (error) {
    if (error.name === "ValidationError") {
      return next(new BadRequest(BAD_REQUEST_VALIDATION_ERROR));
    }
    if (error.code === 11000) {
      return next(new Conflict(CONFLICT_ERROR));
    }
    next(error);
  }
};

module.exports.updateUser = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = { name: req.body.name, email: req.body.email };
    const owner = req.user._id;
    const dbUser = await User.findOne({ email });
    const val = await User.findByIdAndUpdate(owner, user, {
      new: true,
      runValidators: true,
    });
    res.send(val);
  } catch (error) {
    if (error.name === "ValidationError") {
      return next(new BadRequest(BAD_REQUEST_VALIDATION_ERROR));
    }
    if (error.code === 11000) {
      return next(new Conflict(CONFLICT_ERROR));
    }
    next(error);
  }
};

module.exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(new Forbidden(WRONG_DATA_RESPONSE));
    }
    const matched = await crypt.compare(password, user.password);
    if (!matched) {
      return next(new Forbidden(WRONG_DATA_RESPONSE));
    }
    const key = jwt.sign(
      { _id: user._id },
      NODE_ENV === "production" ? JWT_SECRET : "rabotai",
      {
        expiresIn: "7d",
      }
    );
    res
      .cookie("jwt", key, {
        sameSite: "none",
        secure: true,
        maxAge: 7777777,
        httpOnly: true,
      })
      .send({ message: SUCCESS_LOGIN });
  } catch (error) {
    next(error);
  }
};

module.exports.me = async (req, res, next) => {
  try {
    const me = await User.findById(req.user._id);
    res.send(me);
  } catch (err) {
    next(err);
  }
};

module.exports.signout = async (_, res) => {
  res.clearCookie("jwt").send({ message: "Выход" });
};