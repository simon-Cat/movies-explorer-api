// include dotenv
require('dotenv').config();
// include express
const express = require('express');
// include helmet
const helmet = require('helmet');
// include mongoose
const mongoose = require('mongoose');
// include celebrate errors
const { errors } = require('celebrate');
// include cors
const cors = require('cors');
// include routes "users" and "movies"
const { users, movies } = require('./routes');
// include createUser
const { createUser, login } = require('./controllers/users');
// include authorization middleware
const auth = require('./middlewares/auth');
// include "validateSignup" and "validateSignin"
const { validateSignup, validateSignin } = require('./utils/requestValidation');
// include "requrestLogger", "errorLogger"
const { requestLogger, errorLogger } = require('./middlewares/logger');
// Not found error
const { NotFoundError } = require('./errors');
// include centralizedErrorHandler
const centralizedErrorHandler = require('./utils/centralizedErrorHandler');

// PORT
const { PORT = 3000 } = process.env;

// Create server
const app = express();

// helmet
app.use(helmet());

// Connect to mongo server
mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.MONGO_DB_NAME}`, {
  useNewUrlParser: true,
});

//  body parser middleware
app.use(express.urlencoded({
  extended: true,
}));
app.use(express.json());

// request logger
app.use(requestLogger);

// cors
app.use(cors({
  origin: [
    'https://murtazaev-movie-explorer.nomoredomains.xyz',
    'http://murtazaev-movie-explorer.nomoredomains.xyz',
  ],
}));

// post - register new user
app.post('/signup', validateSignup(), createUser);
// post - login user
app.post('/signin', validateSignin(), login);

// authorization middleware
app.use(auth);

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
app.use(centralizedErrorHandler);

// listen port
app.listen(PORT, () => {
  console.log(`Listening port - ${PORT}`);
});
