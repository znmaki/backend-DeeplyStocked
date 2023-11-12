const { MOVEMENT_TYPE } = require('../constants');

const buildMovement = (movement, type) => {
  const quantity =
    type === MOVEMENT_TYPE.LOAD ? movement.quantity : movement.quantity * -1;

  return {
    quantity,
    typeId: type,
    productId: movement.productId,
    userId: movement.userId,
    unitPrice: movement.unitPrice,
  };
};

module.exports = { buildMovement };
