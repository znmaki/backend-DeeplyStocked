const {
  validateRegister,
  validateLogin,
  validateRefreshToken,
  validateForgotPassword,
  validateResetPassword,
} = require('./validations');

module.exports = {
  validateLogin,
  validateRefreshToken,
  validateRegister,
  validateForgotPassword,
  validateResetPassword,
};
