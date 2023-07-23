// include Error Mongoose
const { Error } = require('mongoose');
// include movie model
const Movie = require('../models/movie');
// include Forbidden error, Not found error
const { ForbiddenError, NotFoundError } = require('../errors');

// get all movies
module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .populate('owner')
    .then((movies) => {
      res.send(movies);
    })
    .catch((err) => next(err));
};

// add new movie
module.exports.addMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  const ownerID = req.user._id;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: ownerID,
  })
    .then((newMovie) => {
      res.send(newMovie);
    })
    .catch((err) => next(err));
};

// remove movie
module.exports.removeMovie = (req, res, next) => {
  const { movieID } = req.params;
  const userID = req.user._id;

  Movie.findById(movieID)
    .orFail()
    .then((movie) => {
      const ownerID = movie.owner._id;

      if (!(ownerID.toString() === userID)) {
        return next(new ForbiddenError('У вас нет прав для удаления избранных фильмов других пользователей'));
      }

      return movie.deleteOne()
        .then(() => res.send({ message: `Фильм с id: ${movieID} успешно удален!` }));
    })
    .catch((err) => {
      if (err instanceof Error.DocumentNotFoundError) {
        next(new NotFoundError(`Фильм с id ${movieID} не найден`));
      } else {
        next(err);
      }
    });
};
