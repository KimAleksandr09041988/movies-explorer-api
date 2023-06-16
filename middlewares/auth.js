const token = require('jsonwebtoken');
const { WRONG_ACCESS } = require('../utils/constants');
const Unathorized = require('../customErrors/Unauthorized');

const { NODE_ENV, JWT_SECRET } = require('../utils/config');

function auth(req, _, next) {
  const { jwt } = req.cookies;
  if (!jwt) {
    return next(new Unathorized(WRONG_ACCESS));
  }
  let payload;
  try {
    payload = token.verify(jwt, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key');
  } catch (err) {
    return next(new Unathorized(WRONG_ACCESS));
  }
  req.user = payload;
  next();
}

module.exports = auth;
