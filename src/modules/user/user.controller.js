const userService = require('./user.service');

const createUser = async (req, res) => {
  const { nombre, apellidos, email, telefono, fecha_nacimiento, direccion, sexo, usuario, password, rol } = req.body;

  try {
    const newUser = await userService.createUser({ nombre, apellidos, email, telefono, fecha_nacimiento, direccion, sexo }, { usuario, password, rol });
    res.status(201).json({ message: 'User created successfully', newUser });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
};
const login = async (req, res) => {
  const { usuario, password } = req.body;

  try {
    const user = await userService.login({ usuario, password });
    
    if (user) {
      res.status(200).json({ message: 'Login successful', user });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error during login', error });
  }
};



module.exports = {
  createUser,
  login
};
