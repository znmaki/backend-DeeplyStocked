const { Op } = require('sequelize');

const { Movement, sequelize } = require('../database/models');
const { processRequest } = require('../helpers/core');

class MovementService {
  constructor(repository) {
    this.repository = repository;
  }

  async getAll(filter = {}, query) {
    const config = {
      where: filter,
      attributes: ['id', 'quantity', 'unitPrice', 'date'],
      include: [
        {
          association: 'product',
          attributes: ['name', 'id'],
        },
        { association: 'type' },
      ],
    };

    if (query && query.month && query.year) {
      const { month, year } = query;
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 0);

      config.where.date = {
        [Op.between]: [startDate, endDate],
      };
    }

    if (query && query.page && query.limit) {
      return await processRequest(query, this.repository, config);
    }

    return await this.repository.findAll(config);
  }

  async getById(id) {
    return await this.repository.findByPk(id);
  }

  async getOne(filter) {
    return await this.repository.findOne({ where: filter });
  }

  async create(movement) {
    return await this.repository.create(movement);
  }

  async update(id, movement) {
    const foundMovement = await this.getById(id);
    if (!foundMovement) return null;
    return await foundMovement.update(movement);
  }

  async destroy(id) {
    const foundMovement = await this.getById(id);
    if (!foundMovement) return null;
    return await foundMovement.destroy();
  }

  async getAveragePrice(productId) {
    return await sequelize.query(
      `
      SELECT
        AVG(unit_price) AS average_price
      FROM movement
      WHERE product_id = ${productId} AND deleted_at is NULL
    `,
      { type: sequelize.QueryTypes.SELECT },
    );
  }

  async hasMoreThanTwoMonthsOfMovements(productId) {
    return await sequelize.query(
      `
      SELECT EXTRACT(MONTH FROM movement.date) AS month
      FROM movement
      WHERE product_id = ${productId} AND deleted_at is NULL
      GROUP BY month
    `,
      { type: sequelize.QueryTypes.SELECT },
    );
  }

  async getSalesAndRemainStocksByMonth(productId) {
    return await sequelize.query(
      `
      SELECT 
        EXTRACT(YEAR FROM movement.date) AS year,
        CASE
            WHEN TO_CHAR(movement.date, 'TMmon') = 'ene.' THEN 'Enero'
            WHEN TO_CHAR(movement.date, 'TMmon') = 'feb.' THEN 'Febrero'
            WHEN TO_CHAR(movement.date, 'TMmon') = 'mar.' THEN 'Marzo'
            WHEN TO_CHAR(movement.date, 'TMmon') = 'abr.' THEN 'Abril'
            WHEN TO_CHAR(movement.date, 'TMmon') = 'may.' THEN 'Mayo'
            WHEN TO_CHAR(movement.date, 'TMmon') = 'jun.' THEN 'Junio'
            WHEN TO_CHAR(movement.date, 'TMmon') = 'jul.' THEN 'Julio'
            WHEN TO_CHAR(movement.date, 'TMmon') = 'ago.' THEN 'Agosto'
            WHEN TO_CHAR(movement.date, 'TMmon') = 'sep.' THEN 'Septiembre'
            WHEN TO_CHAR(movement.date, 'TMmon') = 'oct.' THEN 'Octubre'
            WHEN TO_CHAR(movement.date, 'TMmon') = 'nov.' THEN 'Noviembre'
            WHEN TO_CHAR(movement.date, 'TMmon') = 'dic.' THEN 'Diciembre'
        END as month,
        SUM(CASE
                WHEN type.id = 2 THEN (movement.quantity * -1)
                ELSE 0
            END
        ) AS sales_quantity
      FROM product
      LEFT JOIN movement ON product.id = movement.product_id
      LEFT JOIN movement_type as type ON movement.type_id = type.id
      WHERE product.id = ${productId}
      GROUP BY year, month;
    `,
      { type: sequelize.QueryTypes.SELECT },
    );
  }

  async getSalesHistoryByYear(year, productId) {
    return await sequelize.query(
      `
      SELECT 
        EXTRACT(YEAR FROM movement.date) AS year,
        CASE
            WHEN TO_CHAR(movement.date, 'TMmon') = 'jan' THEN 'Enero'
            WHEN TO_CHAR(movement.date, 'TMmon') = 'feb' THEN 'Febrero'
            WHEN TO_CHAR(movement.date, 'TMmon') = 'mar' THEN 'Marzo'
            WHEN TO_CHAR(movement.date, 'TMmon') = 'apr' THEN 'Abril'
            WHEN TO_CHAR(movement.date, 'TMmon') = 'may' THEN 'Mayo'
            WHEN TO_CHAR(movement.date, 'TMmon') = 'jun' THEN 'Junio'
            WHEN TO_CHAR(movement.date, 'TMmon') = 'jul' THEN 'Julio'
            WHEN TO_CHAR(movement.date, 'TMmon') = 'aug' THEN 'Agosto'
            WHEN TO_CHAR(movement.date, 'TMmon') = 'sep' THEN 'Septiembre'
            WHEN TO_CHAR(movement.date, 'TMmon') = 'oct' THEN 'Octubre'
            WHEN TO_CHAR(movement.date, 'TMmon') = 'nov' THEN 'Noviembre'
            WHEN TO_CHAR(movement.date, 'TMmon') = 'dic' THEN 'Diciembre'
        END as month,
        SUM(CASE
                WHEN type.id = 2 THEN (movement.quantity * -1)
                ELSE 0
            END
        ) AS sales_quantity
      FROM product
      LEFT JOIN movement ON product.id = movement.product_id
      LEFT JOIN movement_type as type ON movement.type_id = type.id
      WHERE product.id = ${productId} AND EXTRACT(YEAR FROM movement.date) = ${year}
      GROUP BY year, month;
    `,
      { type: sequelize.QueryTypes.SELECT },
    );
  }
}

module.exports = new MovementService(Movement);
