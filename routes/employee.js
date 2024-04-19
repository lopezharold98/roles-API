const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const authMiddleware = require('../middleware/authMiddleware');


router.get('/', authMiddleware, employeeController.getEmployees);

router.post('/',authMiddleware, employeeController.createEmployee);




module.exports = router;
