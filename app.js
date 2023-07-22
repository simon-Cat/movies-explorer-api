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
// include "validateSignup" and "validateSignin"
const { validateSignup, validateSignin } = require('./utils/requestValidation');
// include celebrate errors
const { errors } = require('celebrate');
// include "requrestLogger", "errorLogger"
const { requestLogger, errorLogger } = require('./middlewares/logger');


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

// request logger
app.use(requestLogger);

// post - register new user
app.post('/signup', validateSignup(), createUser);
// post - login user
app.post('/signin', validateSignin(), login);

// authorization middleware
app.use(auth)

// user routes
app.use('/users', users);
// movie routes
app.use('/movies', movies);

// error logger
app.use(errorLogger);

app.use(errors());

// incorrect route error handler
app.use((req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

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