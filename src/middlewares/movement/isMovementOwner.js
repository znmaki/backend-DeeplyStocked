const { catchAsync, AppError } = require('../../helpers/core');
const { movementService } = require('../../services');

const isMovementOwner = catchAsync(async (req, res, next) => {
  const { id: movementId } = req.params;

  const movement = await movementService.getOne({
    id: movementId,
    userId: req.user.id,
  });

  if (!movement) throw new AppError('Movement not found', 404);
  req.movement = movement;

  next();
});

module.exports = isMovementOwner;
