const token = require('jsonwebtoken');
const { WRONG_ACCESS } = require('../utils/constants');
const Unathorized = require('../customErrors/Unauthorized');

const { JWT_SECRET } = require('../utils/config');

function auth(req, _, next) {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new Unathorized('WRONG_ACCESS'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key');
  } catch (err) {
    return next(new Unathorized('WRONG_ACCESS'));
  }

  req.user = payload;

  next();
}

module.exports = auth;
