// get user info
module.exports.getUserInfo = (req, res) => {
  res.send({
    email: 'test@ya.ru',
    name: 'Alex'
  });
};

// update user info
module.exports.updateUserInfo = (req, res) => {
  res.send({
    email: 'new-test@ya.ru',
    name: 'new name Ben'
  });
};
