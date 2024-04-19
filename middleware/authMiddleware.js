require('dotenv').config();
const jwt = require('jsonwebtoken');
const { User } = require('../models');


const authMiddleware = async (req, res, next) => {
  
  try {
    // Verificar si se proporciona un token en el encabezado de autorización
    const token = req.headers.authorization.split(' ')[1];
    console.log("el token",token)
    if (!token) {
      return res.status(401).json({ message: 'No se proporcionó un token de autenticación' });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedToken) {
      return res.status(401).json({ message: 'Token de autenticación inválido' });
    }
    const user = await User.findOne({ where: { id: decodedToken.userId } });
    if (!user) {
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Error de autenticación:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

module.exports = authMiddleware;
