const express = require('express');
const router = express.Router();
const userController = require('./user.controller');

// Ruta para crear un usuario
router.post('/', userController.createUser);
router.post('/login', userController.login);
module.exports = router;
