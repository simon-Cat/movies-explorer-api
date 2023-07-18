// include Router
const movies = require('express').Router();
// include movie's controllers
const { getMovies, addMovie, removeMovie } = require('../controllers/movies');

// get - all user's movies
movies.get('/', getMovies);

// post - add new movie
movies.post('/', addMovie);

// delete - remove movie
movies.delete('/:id', removeMovie)

module.exports = movies;