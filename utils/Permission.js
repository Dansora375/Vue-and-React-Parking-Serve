/* eslint-disable semi */
import User from '../../models/user'

// eslint-disable-next-line no-unused-vars
const types = {
  GERENTE: {
    tipo: 'Gerente',
    nivel: 1
  },
  SUPERVISOR: {
    tipo: 'Supervisor',
    nivel: 2
  },
  GUARDA: {
    tipo: 'Guarda',
    nivel: 3
  }
}
const Permission = async (username, password) => {
  try {
    const usuario = await User.find({ user: username, password: password })
    // print(user)
    return usuario;
  } catch (error) {
    return 4
  }
}

module.exports = Permission;
