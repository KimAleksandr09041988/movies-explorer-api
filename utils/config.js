const {
  PORT = 3001,
  BIT_FILM_DB = 'mongodb://localhost:27017/bitfilmsdb',
  JWT_SECRET,
  NODE_ENV
} = process.env;

module.exports = {
  PORT,
  BIT_FILM_DB,
  JWT_SECRET,
  NODE_ENV
};
