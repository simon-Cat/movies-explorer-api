// include Error Mongoose
const { Error } = require('mongoose');
// include user model
const User = require('../models/user');
// include bcryptjs
const bcrypt = require('bcrypt');
// include jsonwebtoken
const jwt = require('jsonwebtoken');
// include Not found error, Conflict error
const { NotFoundError, ConflictError } = require('../errors');

// get user info
module.exports.getUserInfo = (req, res, next) => {
  const userID = req.user._id;

  User.findById(userID)
  .then((user) => {
    res.send({
      email: user.email,
      name: user.name,
    });
  })
  .catch((err) => {
    if(err instanceof Error.DocumentNotFound) {
      next(new NotFoundError(`Пользователь с id ${userID}с не найден`));
    } else {
      next(err);
    }
  })
};

// update user info
module.exports.updateUserInfo = (req, res, next) => {
  const { email, name } = req.body;
  const userID = req.user._id;

  User.findById(userID)
    .orFail()
    .then((user) => {
      user.updateOne({ email, name }, { new: true, runValidators: true })
        .then(() => {
          res.send({ email, name });
        });
    })
    .catch((err) => {
      if(err instanceof Error.DocumentNotFound) {
        next(new NotFoundError(`Пользователь с id ${userID}с не найден`));
      } else {
        next(err);
      }
    });
}

// login
module.exports.login = (req, res, next) => {
  console.log('login');
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch((err) => next(err));
}

// register
module.exports.createUser = (req, res, next) => {
  const { email, name, password } = req.body;

  bcrypt.hash(password, 10)
  .then((hash) => {
    User.create({
      email, name, password: hash,
    })
    .then((newUser) => {
      res.status(201).send({
        _id: newUser._id,
        email: newUser.email,
        name: newUser.name,
      })
    })
    .catch((err) => {
      if(err.code === 11000) {
        next(new ConflictError('Пользователь с такими данными уже существует'));
      } else {
        next(err);
      }
    })
  })
};

