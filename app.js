const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

// Importar las rutas
const userRoutes = require('./src/modules/user/user.routes');
const noticiaRoutes = require('./src/modules/noticias/noticia.routes'); // Importamos las rutas de noticias
const citaRoutes = require('./src/modules/citas/citas.routes');
// Crear la aplicación Express
const app = express();

// Middleware para el body parser
app.use(bodyParser.json({ limit: '50mb' }));  // Aumentamos el límite para permitir imágenes grandes
app.use(bodyParser.urlencoded({ extended: true }));

// Servir la carpeta 'img' como archivos estáticos
app.use('/img', express.static(path.join(__dirname, 'src/img')));

// Rutas
app.use('/api/users', userRoutes);
app.use('/api/noticias', noticiaRoutes); // Añadimos la ruta para noticias
app.use('/api/citas', citaRoutes);
// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
