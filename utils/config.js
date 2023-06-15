const {
  PORT = 3001,
  BIT_FILM_DB = 'mongodb://localhost:27017/bitfilmsdb',
  JWT_SECRET = 'some-secret-key',
} = process.env;

module.exports = {
  PORT,
  BIT_FILM_DB,
  JWT_SECRET,
};
