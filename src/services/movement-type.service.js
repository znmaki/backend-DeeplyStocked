const { MovementType } = require('../database/models');

class MovementTypeService {
  constructor(repository) {
    this.repository = repository;
  }

  async getAll() {
    return await this.repository.findAll();
  }

  async getById(id) {
    return await this.repository.findByPk(id);
  }

  async create(movementType) {
    return await this.repository.create(movementType);
  }

  async update(id, movementType) {
    const foundMovementType = await this.getById(id);
    if (!foundMovementType) return null;
    return await foundMovementType.update(movementType);
  }

  async delete(id) {
    const foundMovementType = await this.getById(id);
    if (!foundMovementType) return null;
    return await foundMovementType.destroy();
  }

  async getByName(name) {
    return await this.repository.findOne({ where: { name } });
  }
}

module.exports = new MovementTypeService(MovementType);
