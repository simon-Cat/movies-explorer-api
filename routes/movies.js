// include Router
const movies = require('express').Router();
// include movie's controllers
const { getMovies, addMovie, removeMovie } = require('../controllers/movies');
// include "validateAddMovie", "validateRemoveMovie"
const { validateAddMovie, validateRemoveMovie } = require('../utils/requestValidation');

// get - all user's movies
movies.get('/', getMovies);

// post - add new movie
movies.post('/', validateAddMovie(), addMovie);

// delete - remove movie
movies.delete('/:movieID', validateRemoveMovie(), removeMovie);

module.exports = movies;
