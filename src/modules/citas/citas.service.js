const { poolPromise, sql } = require('../../config/db');

// Servicio para listar todas las citas
const getAllCitas = async () => {
  const pool = await poolPromise;
  const result = await pool.request().query(`
    SELECT c.idCita, c.fecha_cita, c.motivo_cita, u.nombre AS nombreUsuario, u.apellidos AS apellidosUsuario
    FROM citas c
    JOIN users_data u ON c.idUser = u.idUser
  `);
  
  return result.recordset;
};

// Servicio para crear una cita
const createCita = async (citaData) => {
  const pool = await poolPromise;
  const request = new sql.Request(pool);

  const result = await request
    .input('idUser', sql.Int, citaData.idUser)
    .input('fecha_cita', sql.Date, citaData.fecha_cita)
    .input('motivo_cita', sql.VarChar, citaData.motivo_cita)
    .query(`
      INSERT INTO citas (idUser, fecha_cita, motivo_cita) 
      OUTPUT inserted.idCita 
      VALUES (@idUser, @fecha_cita, @motivo_cita)
    `);

  return result.recordset[0];
};

module.exports = {
  getAllCitas,
  createCita,
};
