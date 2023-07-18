// get all movies
module.exports.getMovies = (req, res) => {
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
};

// add new movie
module.exports.addMovie = (req, res) => {
  res.send({
    title: 'Fast and Fourious',
    year: 2001
  });
};

// remove movie
module.exports.removeMovie = (req, res) => {
  res.send({
    text: "Movie was remove"
  });
};
