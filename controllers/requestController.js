const { Request } = require('../models');


exports.getAllRequests = async (req, res) => {
  try {
    const requests = await Request.findAll();
    res.json(requests);
  } catch (error) {
    console.error('Error al obtener las solicitudes:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};


exports.createRequest = async (req, res) => {
  try {
    const { codigo, descripcion, resumen, id_empleado } = req.body;
    const newRequest = await Request.create({
      codigo,
      descripcion,
      resumen,
      id_empleado
    });
    res.status(201).json(newRequest);
  } catch (error) {
    console.error('Error al crear la solicitud:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};


exports.deleteRequestById = async (req, res) => {
  try {
    const requestId = req.params.id;
    const deletedRequest = await Request.destroy({
      where: { id: requestId }
    });
    if (deletedRequest === 0) {
      return res.status(404).json({ message: 'Solicitud no encontrada' });
    }
    res.json({ message: 'Solicitud eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar la solicitud:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};
