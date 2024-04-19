'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Request extends Model {
    static associate(models) {
      Request.belongsTo(models.User, { foreignKey: 'id_empleado' });
    }
  }

  Request.init({
    codigo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    resumen: {
      type: DataTypes.STRING,
      allowNull: false
    },
    id_empleado: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Request',
  });

  return Request;
};
