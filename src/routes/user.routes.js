const express = require('express');
const {
  getUserProducts,
  getUser,
  getUserMovements,
} = require('../controllers/user');
const {
  handleValidations,
  commonValidations,
  handleAuth,
} = require('../middlewares/common');
const { isProfileOwner } = require('../middlewares/user');
const router = express.Router();

// TODO : create middleware profile owner

router.get(
  '/:id/products',
  handleAuth,
  handleValidations(commonValidations.validateIdParam),
  isProfileOwner,
  getUserProducts,
);
router.get(
  '/:id',
  handleAuth,
  handleValidations(commonValidations.validateIdParam),
  isProfileOwner,
  getUser,
);
router.get(
  '/:id/movements',
  handleAuth,
  handleValidations(commonValidations.validateIdParam),
  isProfileOwner,
  getUserMovements,
);

module.exports = router;
