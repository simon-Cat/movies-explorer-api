// include celebrate, Joi
const { celebrate, Segments, Joi } = require('celebrate');
// include urlRegexp
const { urlRegexp, emailRegExp } = require('./regExp');

// signin
module.exports.validateSignin = () =>
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().required().email().pattern(emailRegExp),
      password: Joi.string().required().min(8),
    }),
  });

// signup
module.exports.validateSignup = () =>
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().required().email().pattern(emailRegExp),
      password: Joi.string().required().min(8),
      name: Joi.string().required().min(2).max(30),
    }),
  });

// update user info
module.exports.validateUpdateUserInfo = () =>
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().required().email().pattern(emailRegExp),
      name: Joi.string().required().min(2).max(30),
    }),
  });

// add new movie
module.exports.validateAddMovie = () =>
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.string().required().pattern(urlRegexp),
      trailerLink: Joi.string().required().pattern(urlRegexp),
      thumbnail: Joi.string().required().pattern(urlRegexp),
      movieId: Joi.number().required(),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
    }),
  });

// remove movie
module.exports.validateRemoveMovie = () =>
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      movieID: Joi.string().hex().length(24).required(),
    }),
  });
