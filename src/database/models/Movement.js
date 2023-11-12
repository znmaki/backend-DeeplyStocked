const { Model } = require('sequelize');

module.exports = (sequelizeConnection, dataTypes) => {
  class Movement extends Model {
    static associate(models) {
      Movement.belongsTo(models.Product, {
        foreignKey: 'productId',
        as: 'product',
      });
      Movement.belongsTo(models.MovementType, {
        foreignKey: 'typeId',
        as: 'type',
      });
    }
  }

  Movement.init(
    {
      id: {
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      productId: {
        type: dataTypes.INTEGER,
        field: 'product_id',
        references: {
          model: 'product',
          key: 'id',
        },
      },
      typeId: {
        type: dataTypes.INTEGER,
        field: 'type_id',
        references: {
          model: 'movement_type',
          key: 'id',
        },
      },
      quantity: {
        type: dataTypes.INTEGER,
      },
      unitPrice: {
        type: dataTypes.DECIMAL(10, 2),
        field: 'unit_price',
      },
      userId: {
        field: 'user_id',
        type: dataTypes.INTEGER,
        references: {
          model: 'user',
          key: 'id',
        },
      },
      date: {
        type: dataTypes.DATE,
      },
    },
    {
      sequelize: sequelizeConnection,
      modelName: 'Movement',
      tableName: 'movement',
      paranoid: true,
      createdAt: 'date',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
    },
  );

  return Movement;
};
