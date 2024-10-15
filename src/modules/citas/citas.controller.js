const citaService = require('./citas.service');

// Listar todas las citas
const getAllCitas = async (req, res) => {
  try {
    const citas = await citaService.getAllCitas();
    res.status(200).json(citas);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching citas', error });
  }
};

// Crear una nueva cita
const createCita = async (req, res) => {
  const { idUser, fecha_cita, motivo_cita } = req.body;

  try {
    const newCita = await citaService.createCita({ idUser, fecha_cita, motivo_cita });
    res.status(201).json({ message: 'Cita creada exitosamente', newCita });
  } catch (error) {
    res.status(500).json({ message: 'Error creating cita', error });
  }
};

module.exports = {
  getAllCitas,
  createCita,
};
