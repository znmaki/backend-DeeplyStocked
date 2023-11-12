const { Model } = require('sequelize');

module.exports = (sequelizeConnection, dataTypes) => {
  class MovementType extends Model {
    static associate(models) {
      MovementType.hasMany(models.Movement, {
        foreignKey: 'typeId',
        as: 'movements',
      });
    }
  }

  MovementType.init(
    {
      id: {
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: dataTypes.STRING(100),
      },
    },
    {
      sequelize: sequelizeConnection,
      modelName: 'MovementType',
      tableName: 'movement_type',
      timestamps: false,
      paranoid: true,
      deletedAt: 'deleted_at',
    },
  );

  return MovementType;
};
