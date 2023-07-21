// include express
const express = require('express');
// include mongoose
const mongoose = require('mongoose');
// include routes "users" and "movies"
const { users, movies } = require('./routes');
// include createUser
const { createUser, login } = require('./controllers/users');
// include authorization middleware
const auth = require('./middlewares/auth');

// PORT
const { PORT=3000 } = process.env;

// Create server
const app = express();

// Connect to mongo server
mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb',  {
  useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false
});

//  body parser middleware
app.use(express.urlencoded({
  extended: true,
}));
app.use(express.json());

// post - register new user
app.post('/signup', createUser);
// post - login user
app.post('/signin', login);

// authorization middleware
app.use(auth)

// user routes
app.use('/users', users);
// movie routes
app.use('/movies', movies);

// centralized error handler
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    err,
    message: statusCode === 500 ? 'На сервере произошла ошибка' : message,
  });

  next();
});


// listen port
app.listen(PORT, () => {
  console.log(`Listening port - ${PORT}`);
})