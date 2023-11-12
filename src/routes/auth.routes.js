const express = require('express');
const {
  register,
  login,
  refreshAccessToken,
  logout,
  forgotPassword,
  resetPassword,
  activate,
} = require('../controllers/auth');
const { handleValidations } = require('../middlewares/common');
const {
  validateRegister,
  validateLogin,
  validateRefreshToken,
  validateForgotPassword,
  validateResetPassword,
} = require('../middlewares/auth');
const { validateActivate } = require('../middlewares/auth/validations');

const router = express.Router();

router.post('/register', handleValidations(validateRegister), register);
router.post('/login', handleValidations(validateLogin), login);
router.post(
  '/refresh-token',
  handleValidations(validateRefreshToken),
  refreshAccessToken,
);
router.post('/logout', handleValidations(validateRefreshToken), logout);
router.post(
  '/forgot-password',
  handleValidations(validateForgotPassword),
  forgotPassword,
);
router.post(
  '/reset-password',
  handleValidations(validateResetPassword),
  resetPassword,
);
router.post('/activate', handleValidations(validateActivate), activate);


module.exports = router;
