// include Router
const users = require('express').Router();
//  include user's controllers
const { getUserInfo, updateUserInfo } = require('../controllers/users');
// include "validateUpdateUserInfo"
const { validateUpdateUserInfo } = require('../utils/requestValidation');

// get - user info (email and name)
users.get('/me', getUserInfo);

// patch - user info (email and name)
users.patch('/me', validateUpdateUserInfo(), updateUserInfo);

module.exports = users;
