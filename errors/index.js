// Authorization error
const AuthorizationError = require('./authorization-error');
// Forbidden error
const ForbiddenError = require('./forbidden-error');
// Not found error
const NotFoundError = require('./not-found-error');
// Conflict error
const ConflictError = require('./conflict-error');


module.exports = {
  AuthorizationError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
};