// include mongoose
const mongoose = require('mongoose');
// include urlRegExp
const urlRegExp = require('../utils/urlRegexp');

// schema for movie
const movieSchema = mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    match: urlRegExp,
  },
  trailerLink: {
    type: String,
    required: true,
    match: urlRegExp,
  },
  thumbnail: {
    type: String,
    required: true,
    match: urlRegExp,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
}, { versionKey: false });

// model for movie
module.exports = mongoose.model('movie', movieSchema);
