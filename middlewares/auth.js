// include jsonwebtoken
const jwt = require('jsonwebtoken');
// include Authorization error
const { AuthorizationError } = require('../errors');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  let payload = null;

  try {
    if(!authorization || !authorization.startsWith('Bearer ')) {
      return next(new AuthorizationError('Необходима авторизация'));
    }
    const token = authorization.replace('Bearer ', '');

    payload = jwt.verify(token, 'some-secret-key');
  } catch(err) {
    if(err.name === 'JsonWebTokenError' ) {
      next(new AuthorizationError('Необходима авторизация'));
    } else {
      next(err);
    }
  }

  req.user = payload;

  return next();
}