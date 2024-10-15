const { poolPromise, sql } = require('../../config/db');

const createUser = async (userData, loginData) => {
  const pool = await poolPromise;
  const transaction = new sql.Transaction(pool);

  try {
    await transaction.begin();

    // Insertar en users_data
    const userRequest = new sql.Request(transaction);
    const userResult = await userRequest
      .input('nombre', sql.VarChar, userData.nombre)
      .input('apellidos', sql.VarChar, userData.apellidos)
      .input('email', sql.VarChar, userData.email)
      .input('telefono', sql.VarChar, userData.telefono)
      .input('fecha_nacimiento', sql.Date, userData.fecha_nacimiento)
      .input('direccion', sql.VarChar, userData.direccion)
      .input('sexo', sql.VarChar, userData.sexo)
      .query(`INSERT INTO users_data (nombre, apellidos, email, telefono, fecha_nacimiento, direccion, sexo) 
              OUTPUT inserted.idUser 
              VALUES (@nombre, @apellidos, @email, @telefono, @fecha_nacimiento, @direccion, @sexo)`);

    const idUser = userResult.recordset[0].idUser;

    // Insertar en users_login
    const loginRequest = new sql.Request(transaction);
    await loginRequest
      .input('idUser', sql.Int, idUser)
      .input('usuario', sql.VarChar, loginData.usuario)
      .input('password', sql.VarChar, loginData.password) // Contraseña en texto plano
      .input('rol', sql.VarChar, loginData.rol)
      .query(`INSERT INTO users_login (idUser, usuario, password, rol) 
              VALUES (@idUser, @usuario, @password, @rol)`);

    await transaction.commit();

    return { idUser, ...userData, usuario: loginData.usuario, rol: loginData.rol };
  } catch (error) {
    await transaction.rollback();
    throw new Error('Transaction failed: ' + error.message);
  }
};

const login = async ({ usuario, password }) => {
  const pool = await poolPromise;
  const request = new sql.Request(pool);

  // Verificamos si existe el usuario con la contraseña dada
  const result = await request
    .input('usuario', sql.VarChar, usuario)
    .input('password', sql.VarChar, password)
    .query('SELECT idUser, usuario, rol FROM users_login WHERE usuario = @usuario AND password = @password');

  // Si el usuario existe, devolvemos la información, si no, devolvemos null
  return result.recordset.length > 0 ? result.recordset[0] : null;
};

module.exports = {
  createUser,
  login
};
