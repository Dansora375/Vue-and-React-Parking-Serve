
// funciones y librerias para crear el usuario y generar el token
import { SECRET, DURATION_TOKEN } from "../configuration/config";
// import { setUser } from '../middleWares/auth/auth'
import User from "../models/user";

import jwt from 'jsonwebtoken'




module.exports = {
  register: async (req, res, next) => {
    const {
      username,
      password,
      rol,
      email,
      identification,
      name,
      neighborhood
    } = req.body
  
    try {
      // validando que el usuario no exista
      await User.exists({ username }, async (error, result) => {
        if (error) {
          res.status(400)
          res.send({ auth: false, message: `${error}` })
        } else {
          if (result) {
            res.status(403)
            res.send({ auth: false, message: 'el nombre de usuario ya esta asignado', isAssigned: true })
          } else {
            // el usuario no existe por lo que se puede continuar con el resto de la funcion
            const user = new User({
              username,
              password,
              rol,
              email,
              identification,
              name,
              neighborhood
            })
  
            
  
            // console.log(user)
            
            await user.save((err) => {
              if(err) {
                next(err)
              }
            })
            
            
  
            // creando el token a partir del usuario
            const token = jwt.sign({ id: user._id }, SECRET, {
              expiresIn: DURATION_TOKEN // definiendo la duracion del token
            })
            // eliminando la contraseña del usuario para poder enviar los datos al cliente
            user.password = undefined
            user._id = undefined
            res.status(200)
            res.json({ token, user })
          }
        }
      })
    } catch (error) {
      res.status(400)
      res.send({ message: `Error creando el usuario ${error}` })
    }
  },
  login: async (req, res) => {
    res.send({ userData: req.userData, token: req.token, auth: true })
  }
}