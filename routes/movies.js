// include Router
const movies = require('express').Router();

// get - all user's movies
movies.get('/movies', (req, res) => {
  res.send([
    {
      title: 'Man in black',
      year: 1997
    },
    {
      title: 'Man in black II',
      year: 2002
    }
  ]);
});

// post - add new movie
movies.post('/movies', (req, res) => {
  res.send({
    title: 'Fast and Fourious',
    year: 2001
  })
});

// delete - remove movie
movies.delete('/movies/_id', (req, res) => {
  res.send({
    text: "Movie was remove"
  })
})

module.exports = movies;