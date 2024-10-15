const express = require('express');
const router = express.Router();
const citasController = require('./citas.controller');

// Ruta para listar todas las citas
router.get('/', citasController.getAllCitas);

// Ruta para crear una nueva cita
router.post('/', citasController.createCita);

module.exports = router;
