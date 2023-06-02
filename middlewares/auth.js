const token = require('jsonwebtoken');
const { WRONG_ACCESS } = require('../utils/constants');
const Unathorized = require('../customErrors/Unauthorized');

const { JWT_SECRET } = require('../utils/config');

function auth(req, _, next) {
  const { jwt } = req.cookies;
  if (!jwt) {
    throw next(new Unathorized(WRONG_ACCESS));
  }
  let payload;
  try {
    payload = token.verify(jwt, JWT_SECRET);
  } catch (err) {
    throw next(new Unathorized(WRONG_ACCESS));
  }
  req.user = payload;
  next();
}

module.exports = auth;
