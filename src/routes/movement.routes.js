const express = require('express');

const { handleValidations, handleAuth } = require('../middlewares/common');
const { update, destroy } = require('../controllers/movement');
const { movementsValidations } = require('../middlewares/movement');
const isMovementOwner = require('../middlewares/movement/isMovementOwner');
const router = express.Router();

router.put(
  '/:id',
  handleAuth,
  isMovementOwner,
  handleValidations(movementsValidations.onUpdate),
  update,
);
router.delete(
  '/:id',
  handleAuth,
  isMovementOwner,
  handleValidations(movementsValidations.onDelete),
  destroy,
);

module.exports = router;
