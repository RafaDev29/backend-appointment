const { poolPromise, sql } = require('../../config/db');
const path = require('path');

const getAllNoticias = async () => {
    const pool = await poolPromise;
    const result = await pool.request().query(`
      SELECT n.idNoticia, n.titulo, n.texto, n.fecha, n.imagen, u.nombre AS nombreUsuario, u.apellidos AS apellidosUsuario
      FROM noticias n
      JOIN users_data u ON n.idUser = u.idUser
    `);
  
    // Para cada noticia, construimos la URL de la imagen
    const noticiasConUsuario = result.recordset.map(noticia => {
      return {
        ...noticia,
        imagen: `http://localhost:3000/img/noticias/${noticia.imagen}` // Construimos la URL de la imagen
      };
    });
  
    return noticiasConUsuario;
  };

// Servicio para crear una noticia
const createNoticia = async (noticiaData, imageFileName) => {
  const pool = await poolPromise;
  const request = new sql.Request(pool);

  const result = await request
    .input('titulo', sql.VarChar, noticiaData.titulo)
    .input('texto', sql.Text, noticiaData.texto)
    .input('fecha', sql.Date, noticiaData.fecha)
    .input('idUser', sql.Int, noticiaData.idUser)
    .input('imagen', sql.VarChar, imageFileName) // Guardamos solo el nombre de la imagen
    .query(`INSERT INTO noticias (titulo, texto, fecha, idUser, imagen) 
            OUTPUT inserted.idNoticia 
            VALUES (@titulo, @texto, @fecha, @idUser, @imagen)`);

  return result.recordset[0];
};

module.exports = {
  getAllNoticias,
  createNoticia,
};
