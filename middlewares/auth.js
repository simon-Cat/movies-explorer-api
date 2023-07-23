// include NODE_ENV, JWT_SECRET
const { NODE_ENV, JWT_SECRET } = process.env;
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

    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
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