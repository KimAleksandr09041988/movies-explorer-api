const Movie = require('../models/movie');
const BadRequest = require('../customErrors/BadRequest');
const Forbidden = require('../customErrors/Forbidden');
const NotFound = require('../customErrors/NotFound');
const {
  BAD_REQUEST_VALIDATION_ERROR,
  NOT_FOUND_DELETING_CARD,
  FORBIDDEN_RESPONSE,
  BAD_REQUEST_CAST_ERROR,
} = require('../utils/constants');

module.exports.postCard = async (req, res, next) => {
  try {
    const owner = req.user._id;
    const card = await Movie.create({
      ...req.body,
      owner,
    });
    res.send(card);
  } catch (error) {
    if (error.name === 'ValidationError') {
      console.log(error);
      next(new BadRequest(BAD_REQUEST_VALIDATION_ERROR));
    } else {
      next(error);
    }
  }
};

module.exports.getCards = async (req, res, next) => {
  try {
    const response = await Movie.find({ owner: req.user._id });
    res.send(response);
  } catch (error) {
    next(error);
  }
};

module.exports.deleteCard = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await Movie.findById(id);
    if (!response) {
      next(new NotFound(NOT_FOUND_DELETING_CARD));
    } else if (response.owner.toString() !== req.user._id) {
      next(new Forbidden(FORBIDDEN_RESPONSE));
    } else {
      const deletedCard = await Movie.findByIdAndDelete(id);
      res.send({ message: `Удалили карточку ${deletedCard.nameRU}` });
    }
  } catch (error) {
    if (error.name === 'CastError') {
      next(new BadRequest(BAD_REQUEST_CAST_ERROR));
    } else {
      next(error);
    }
  }
};
