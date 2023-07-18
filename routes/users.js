// include Router
const users = require('express').Router();

// get user info (email and name)
users.get('/users/me', (req, res) => {
  res.send({
    email: 'test@ya.ru',
    name: 'Alex'
  });
});

// patch user info (email and name)
users.patch('/users/me', (req, res) => {
  res.send({
    email: 'new-test@ya.ru',
    name: 'new name Ben'
  })
});

module.exports = users;