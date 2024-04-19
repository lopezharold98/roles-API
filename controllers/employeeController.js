const { Employee } = require('../models');

exports.getEmployees = async (req, res) => {
  try {    
    const page = req.query.page || 1; 
    const pageSize = req.query.pageSize || 10; 
    const offset = (page - 1) * pageSize;
    const employees = await Employee.findAll({
      limit: pageSize,
      offset: offset
    });
    res.json(employees);
  } catch (error) {
    console.error('Error al consultar empleados:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};
exports.createEmployee = async (req, res) => {
  try {
    const { nombre, fecha_ingreso, salario } = req.body;
    const newEmployee = await Employee.create({
      nombre,
      fecha_ingreso,
      salario
    });
    res.status(201).json(newEmployee);
  } catch (error) {
    console.error('Error al insertar empleado:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};


