const { buildMovement } = require('../helpers/builders');
const { MOVEMENT_TYPE } = require('../helpers/constants');
const { catchAsync, appResponse, AppError } = require('../helpers/core');
const { movementService, productService } = require('../services');

exports.generateLoad = catchAsync(async (req, res) => {
  const { id: productId } = req.params;
  const { id: userId } = req.user;
  const movement = buildMovement(
    { ...req.body, userId, productId },
    MOVEMENT_TYPE.LOAD,
  );

  const generatedMovement = await movementService.create(movement);

  appResponse({
    res,
    status: 201,
    body: generatedMovement,
  });
});

exports.generateWithdraw = catchAsync(async (req, res) => {
  const { id: productId } = req.params;
  const { id: userId } = req.user;

  if (req.body.quantity > req.product.stock)
    throw new AppError('Insufficient stock', 400, 'INSUFFICIENT_STOCK');

  const movement = buildMovement(
    { ...req.body, userId, productId },
    MOVEMENT_TYPE.WITHDRAW,
  );

  const generatedMovement = await movementService.create(movement);

  appResponse({
    res,
    status: 201,
    body: generatedMovement,
  });
});

exports.update = catchAsync(async (req, res) => {
  const { id } = req.params;
  const movement = await movementService.getById(id);

  if (!movement)
    throw new AppError('Movement not found', 404, 'MOVEMENT_NOT_FOUND');

  const movementUpdated = await movementService.update(id, req.body);

  appResponse({
    res,
    status: 200,
    body: movementUpdated,
  });
});

exports.destroy = catchAsync(async (req, res) => {
  const { id } = req.params;
  const movement = await movementService.getById(id);

  if (!movement)
    throw new AppError('Movement not found', 404, 'MOVEMENT_NOT_FOUND');

  await movementService.destroy(id);
  await productService.updateStock(movement.productId);

  appResponse({
    res,
    status: 204,
  });
});
