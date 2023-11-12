const productService = require('./product.service');
const movementService = require('./movement.service');
const movementTypeService = require('./movement-type.service');
const tokenService = require('./refresh-token.service');
const userService = require('./user.service');

module.exports = {
  productService,
  movementService,
  movementTypeService,
  tokenService,
  userService,
};
