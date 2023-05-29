const route = require('express').Router();

const user = require('./user');
const movies = require('./movie');

route.use(user);
route.use(movies);

module.exports = route;
