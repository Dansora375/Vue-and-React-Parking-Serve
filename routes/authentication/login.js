import e from 'express'
import express, { json } from 'express'

import User from '../../models/user'
const router = express.Router()

function dataSend (data, error, msg, created, userExists) {
  this.data = data
  this.error = error
  this.msg = msg
  this.created = created
  this.userExists = userExists
}

router.post('/register', async (req, res) => {
  const body = req.body

  try {
    User.find({
      $or: [
        { user: body.user },
        { email: body.email }
      ]
    }, (err, result) => {
      if (err) {
        res.send(new dataSend({}, err, 'Error creando el usuario', false, false))
      } else if (result.length > 0) {
        res.send(new dataSend(result, err, 'El usuario o correo ya existen', false, true))
      } else {
        const newUser = User.create(body)
        res.send(newUser)
      }
    })
  } catch (error) {
    res.status(500).json({
      mensaje: 'Ha ocurrido un error al crear un nuevo usuario',
      error
    })
  }
})

function dataLogin (data, error, correctPassword) {
  this.data = data
  this.error = error
  this.correctPassword = correctPassword
}

router.post('/login', async (req, res) => {
  const body = req.body
  try {
    let data
    if ('user' in body) {
      data = { user: body.user }
    } else if ('email' in body) {
      data = { email: body.email }
    } else {
      res.sendStatus(500).json({
        mensaje: 'Debe proporcionar o usuario o email'
      })
      // return;
    }

    User.findOne(data, (error, user) => {
      if (error) {
        res.sendStatus(500).json(new dataLogin({}, false, error, false))
      } else if (!user) {
        res.send(new dataLogin({}, 'No se pudo loguear a la base', false))
      } else {
        user.isCorrectPassword(body.password, (error, result) => {
          if (error) {
            res.sendStatus(500).json(new dataLogin({}, false, error, false))
          } else if (result) {
            res.send(new dataLogin(user, {}, true))
          } else {
            res.send(new dataLogin({}, 'usuario o contraseña incorrecta', false))
          }
        })
      }
    })
    // console.log(data);
  } catch (error) {
    console.log(error)
    res.status(500).json(new dataLogin({}, false, error, false))
  }
})

module.exports = router
