const noticiaService = require('./noticia.service');
const multer = require('multer');
const path = require('path');

// Configuración de Multer para subir la imagen a 'src/img/noticias/'
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../img/noticias')); // Guardamos la imagen en 'src/img/noticias'
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Guardar con un nombre único
  }
});

const upload = multer({ storage: storage });

// Listar todas las noticias
const getAllNoticias = async (req, res) => {
  try {
    const noticias = await noticiaService.getAllNoticias();
    res.status(200).json(noticias);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching noticias', error });
  }
};

// Crear una noticia
const createNoticia = async (req, res) => {
  const { titulo, texto, fecha, idUser } = req.body;
  const imageFileName = req.file.filename; // Obtenemos el nombre de la imagen subida

  try {
    const newNoticia = await noticiaService.createNoticia({ titulo, texto, fecha, idUser }, imageFileName);
    res.status(201).json({ message: 'Noticia creada exitosamente', newNoticia });
  } catch (error) {
    res.status(500).json({ message: 'Error creating noticia', error });
  }
};

module.exports = {
  getAllNoticias,
  createNoticia,
  upload // Exportamos 'upload' para manejar la subida de archivos
};
