const express = require('express');
const router = express.Router();
const noticiaController = require('./noticia.controller');

// Ruta para listar todas las noticias
router.get('/', noticiaController.getAllNoticias);

// Ruta para crear una nueva noticia (con subida de imagen)
router.post('/', noticiaController.upload.single('imagen'), noticiaController.createNoticia);

module.exports = router;
