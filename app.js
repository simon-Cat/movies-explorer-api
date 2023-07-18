// include express
const express = require('express');
// include mongoose
const mongoose = require('mongoose');
// include routes "users" and "movies"
const { users, movies } = require('./routes');
// include body-parser
const bodyParser = require('body-parser');

// PORT
const { PORT=3000 } = process.env;

// Create server
const app = express();

//  body parser middleware
app.use(express.urlencoded({
  extended: true,
}));
app.use(express.json());

// user routes
app.use('/users', users);
// movie routes
app.use('/movies', movies);

// Connect to mongo server
mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb',  {
  useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false
});

// listen port
app.listen(PORT, () => {
  console.log(`Listening port - ${PORT}`);
})