const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (value) => validator.isEmail(value),
        message: 'Введён невалидный адрес электронной почты.',
      },
    },
  },
  { toObject: { useProjection: true }, toJSON: { useProjection: true } },
);

module.exports = mongoose.model('user', userSchema);
