const centralizedErrorHandler = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    err,
    message: statusCode === 500 ? 'На сервере произошла ошибка' : message,
  });

  next();
};

module.exports = centralizedErrorHandler;
