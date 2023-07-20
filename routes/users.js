// include Router
const users = require('express').Router();
//  include user's controllers
const { getUserInfo, updateUserInfo } = require('../controllers/users');

// get - user info (email and name)
users.get('/me', getUserInfo);

// patch - user info (email and name)
users.patch('/me', updateUserInfo);

module.exports = users;