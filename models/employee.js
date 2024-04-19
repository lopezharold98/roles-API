'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    static associate(models) {
      
    }
  }

  Employee.init({
    fecha_ingreso: DataTypes.DATE,
    salario: DataTypes.FLOAT,
    nombre: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Employee',
  });

  return Employee;
};
