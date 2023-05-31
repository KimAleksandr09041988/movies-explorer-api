const crypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const BadRequest = require('../customErrors/BadRequest');
const RepeatsEmailError = require('../customErrors/RepeatsEmailError');
const Unauthorized = require('../customErrors/Unauthorized');
const {
  BAD_REQUEST_VALIDATION_ERROR,
  REPEATS_EMAIL_ERROR,
  WRONG_DATA_RESPONSE,
  SUCCESS_LOGIN,
} = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.postProfile = async (req, res, next) => {
  const { email, password, name } = req.body;
  try {
    const hashedPassword = await crypt.hash(password, 10);
    const response = await User.create({
      email,
      name,
      password: hashedPassword,
    });
    res.send(response);
  } catch (error) {
    if (error.name === 'ValidationError') {
      next(new BadRequest(BAD_REQUEST_VALIDATION_ERROR));
    } else if (error.code === 11000) {
      next(new RepeatsEmailError(REPEATS_EMAIL_ERROR));
    } else {
      next(error);
    }
  }
};

module.exports.updateUser = async (req, res, next) => {
  try {
    const user = { name: req.body.name, email: req.body.email };
    const owner = req.user._id;
    const val = await User.findByIdAndUpdate(owner, user, {
      new: true,
      runValidators: true,
    });
    res.send(val);
  } catch (error) {
    if (error.name === 'ValidationError') {
      next(new BadRequest(BAD_REQUEST_VALIDATION_ERROR));
    } else if (error.code === 11000) {
      next(new RepeatsEmailError(REPEATS_EMAIL_ERROR));
    } else {
      next(error);
    }
  }
};

module.exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select('+password');
    const matched = await crypt.compare(password, user.password);
    if (!user) {
      next(new Unauthorized(WRONG_DATA_RESPONSE));
    } else if (!matched) {
      next(new Unauthorized(WRONG_DATA_RESPONSE));
    } else {
      const key = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key',
        {
          expiresIn: '7d',
        },
      );
      res
        .cookie('jwt', key, {
          sameSite: 'none',
          secure: true,
          maxAge: 7777777,
          httpOnly: true,
        })
        .send({ message: SUCCESS_LOGIN });
    }
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
  res.clearCookie('jwt').send({ message: 'Выход' });
};
