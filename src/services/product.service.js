const { Product, Movement } = require('../database/models');
const { processRequest } = require('../helpers/core');

class ProductService {
  constructor(productRepo, movementRepo) {
    this.productRepo = productRepo;
    this.movementRepo = movementRepo;
  }

  async updateStock(productId) {
    const movements = await this.movementRepo.findAll({
      where: {
        productId,
      },
      attributes: ['quantity', 'typeId'],
    });

    const stock = movements.reduce((acc, movement) => {
      return acc + movement.quantity;
    }, 0);

    return await this.update(productId, { stock });
  }

  async getAll(filter = {}, query) {
    const queryConfig = {
      where: filter,
      attributes: ['id', 'name', 'stock'],
    };

    if (query && query.page && query.limit) {
      return await processRequest(query, this.productRepo, queryConfig);
    }

    return await this.productRepo.findAll(queryConfig);
  }

  async getOne(filter = {}) {
    return await this.productRepo.findOne({
      where: filter,
      attributes: ['id', 'name', 'stock'],
    });
  }

  async getById(id) {
    return await this.productRepo.findByPk(id);
  }

  async create(product) {
    return await this.productRepo.create(product);
  }

  async update(id, product) {
    const foundProduct = await this.getById(id);
    if (!foundProduct) return null;
    return await foundProduct.update(product);
  }

  async delete(id) {
    const foundProduct = await this.getById(id);
    if (!foundProduct) return null;
    return await foundProduct.destroy();
  }

  async getByName(name) {
    return this.productRepo.findOne({ where: { name } });
  }

  async isValidName(name, userId) {
    const product = await this.productRepo.findOne({
      where: {
        userId,
        name,
      },
    });

    return !Boolean(product);
  }
}

module.exports = new ProductService(Product, Movement);
