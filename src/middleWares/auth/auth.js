import User from '../../models/user'
import jwt from 'jsonwebtoken'
import { SECRET, DURATION_TOKEN } from '../../configuration/config'

async function setUser (req, res, next) {
  const { username, password } = req.body
  try {
    if (!(username && password)) {
      res.status(401)
      res.send({ error: 'Debe proporcionar los datos de usuario y contraseña' })
    } else {
      await User.findOne({ username }, (error, user) => {
        if (error) {
          res.status(400)
          res.send({ error: `${error}` })
        } else if (user) {
          user.isCorrectPassword(password, (err, isCorrect) => {
            if (err) {
              res.status(400)
              res.send({ error: `${error}` })
            } else {
              if (isCorrect) {
                // llegado a este punto, la contraseña ha sido validada

                const token = jwt.sign({ id: user._id }, SECRET, {
                  expiresIn: DURATION_TOKEN // definiendo la duracion del token
                })
                // eliminando la contraseña del usuario para poder enviar los datos al cliente
                user.password = undefined
                user._id = undefined
                // res.status(200)
                // res.json({token, user, auth: true})

                req.userData = user
                req.token = token
                next()
              } else {
                // contraseña erronea
                res.status(401)
                res.send({ auth: false, error: 'la contraseña es erronea', incorrectPassword: true })
              }
            }
          })
        } else {
          // no se encontro el usuario
          res.status(404)
          res.send({ auth: false, error: 'El usuario no existe en la base de datos' })
        }
      }).clone()
    }
  } catch (error) {
    res.status(400)
    res.send({ error: `${error}` })
  }
}

// se podra consultar el usuario a partir del token
async function setUserToken (req, res, next) {

}

module.exports = {
  setUser
}
