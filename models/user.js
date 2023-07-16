// include mongoose
const mongoose = require('mongoose');
// include validator
const validator = require('validator');

// schema for user
const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validate(v) {
        return validator.isEmail(v);
      }
    }
  },
  password: {
    type: String,
    required: true,
    select: true
  },
  name: {
    type: String,
    minLength: 2,
    maxLength: 30
  }
});

// model for user
module.exports = mongoose.model('user', userSchema);
