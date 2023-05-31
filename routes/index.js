const route = require('express').Router();

const user = require('./user');
const movies = require('./movie');
const { WRONG_URL } = require('../utils/constants');
const NotFound = require('../customErrors/NotFound');

route.use(user);
route.use(movies);
route.use('*', () => {
  throw new NotFound(WRONG_URL);
});

module.exports = route;
