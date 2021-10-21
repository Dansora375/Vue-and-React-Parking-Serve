/* eslint-disable semi */
/* eslint-disable new-cap */
// import e from 'express'
// eslint-disable-next-line no-unused-vars
// import Permission from '../../utils/Permission';
import express from 'express'

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
        res.send(new dataSend(newUser))
      }
    })
  } catch (error) {
    res.status(500).json(new dataSend({}, error, {}, false, false))
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

    User.findOne(data, (error, userResult) => {
      // eliminando el password de los datos que puedan ser emitidos
      try {
        const {
          Cc,
          name,
          user,
          email,
          type
        } = userResult
        const usuarioData = {
          Cc,
          name,
          user,
          email,
          type
        }
        if (error) {
          res.sendStatus(500).json(new dataLogin({}, false, error, false))
        } else if (!userResult) {
          res.send(new dataLogin({}, 'No se pudo loguear a la base', false))
        } else {
          userResult.isCorrectPassword(body.password, (error, result) => {
            if (error) {
              res.sendStatus(500).json(new dataLogin({}, false, error, false))
            } else if (result) {
              res.send(new dataLogin(usuarioData, {}, true))
            } else {
              res.send(new dataLogin({}, 'usuario o contraseña incorrecta', false))
            }
          })
        }
      } catch(error) {
        res.sendStatus(500).json(new dataLogin({}, error, false));
      }
      
    })
    // console.log(data);
  } catch (error) {
    console.log(error)
    res.status(500).json(new dataLogin({}, false, error, false))
  }
})

router.post('/prueba', async (req, res) => {
  try {
    const user = 'Cristian2024';
    const password = '48596712';
    // const usuario = Permission(user,password)
    const data = await User.getPermission(user, password);
    if (data !== 1) {
      res.status(500).json({
        error: 'El usuario no posee los permisos suficientes'
      });
    } else {
      // haga su consulta/insercion/update a gusto
    }
    console.log('El usuario tiene un permiso de nivel : \t', data);
    res.json({ data });
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
