module.exports.InternalServerError = (err, _, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500
      ? 'Проблема на сервере, что-то сломалось :('
      : message,
  });
  next();
};
