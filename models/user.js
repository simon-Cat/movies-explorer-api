// include mongoose
const mongoose = require('mongoose');
// include bcryptjs
const bcrypt = require('bcrypt');
// Authorization error
const { AuthorizationError } = require('../errors');
const { emailRegExp } = require('../utils/regExp');

// schema for user
const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: emailRegExp,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    minLength: 2,
    maxLength: 30,
  },
}, { versionKey: false });

// static method "findUserByCredentials"
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new AuthorizationError('Неправильные почта или пароль.'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new AuthorizationError('Неправильные почта или пароль.'));
          }
          return user;
        });
    });
};

// model for user
module.exports = mongoose.model('user', userSchema);
