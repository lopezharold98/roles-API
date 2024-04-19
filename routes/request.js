const express = require('express');
const router = express.Router();
const requestController = require('../controllers/requestController');
const authMiddleware = require('../middleware/authMiddleware');


router.get('/', authMiddleware, requestController.getAllRequests);

router.post('/', authMiddleware, requestController.createRequest);

router.delete('/:id', authMiddleware, requestController.deleteRequestById);

module.exports = router;
