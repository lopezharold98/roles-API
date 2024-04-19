require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User,Employee } = require('../models');

async function register(req, res) {
    
  try {
    
    const { username, password, role,email, salario, fecha_ingreso, nombre } = req.body;
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      role: role || 'Empleado' 
    });
    
    const token = jwt.sign({ userId: newUser.id, username: newUser.username, role: newUser.role }, process.env.JWT_SECRET, { expiresIn: '2h' });
    if (role === 'Empleado') {
      await Employee.create({
        nombre,
        fecha_ingreso,
        salario,
        UserId: newUser.id 
      });
    }
    
    res.status(201).json({ token });
  } catch (error) {
    console.error('Error en el registro de usuario:', error);
    res.status(500).json({ message: 'Error en el registro de usuario' });
  }
}

async function login(req, res) {
    try {
    
      const { username, password } = req.body;
  
      
      const user = await User.findOne({ where: { username } });
      if (!user) {
        return res.status(401).json({ message: 'Credenciales inválidas' });
      }
  
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: 'Credenciales inválidas' });
      }
  
      const accessToken = jwt.sign({ userId: user.id, username: user.username, role: user.role }, process.env.JWT_SECRET, { expiresIn: '2h' });
  
      res.status(200).json({ body:{accessToken, refreshToken : accessToken} });
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
      res.status(500).json({ message: 'Error en el inicio de sesión' });
    }
  }

  async function logout(req, res) {
    try {
      
      res.clearCookie('jwtToken');
      res.status(200).json({ message: 'Sesión cerrada exitosamente' });
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      res.status(500).json({ message: 'Error al cerrar sesión' });
    }
  }
  async function refreshToken(req, res) {
    try {
      const { refreshToken } = req.body;
  
      const decodedToken = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
      
      const user = await User.findByPk(decodedToken.userId);
  
      if (!user) {
        return res.status(401).json({ message: 'Usuario no encontrado' });
      }
      const newAccessToken = jwt.sign({ userId: user.id, username: user.username, role: user.role }, process.env.JWT_SECRET, { expiresIn: '2h' });
  
      res.status(200).json({ body:{accessToken: newAccessToken, refreshToken : newAccessToken}  });
    } catch (error) {
      console.error('Error al refrescar el token:', error);
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Refresh token ha expirado' });
      }
      res.status(500).json({ message: 'Error al refrescar el token' });
    }
  }
  
  module.exports = { register, login, logout, refreshToken };
