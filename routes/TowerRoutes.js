import express from 'express'

import Tower from '../models/Tower'
import User from '../models/user'

const router = express.Router()

// obteniendo la lista completa de torres en el conjunto
router.get('/list', async (req, res) => {
  try {
    const listaTowers = await Tower.find()
    res.status(200).json({ data: listaTowers, completed: true })
  } catch (error) {
    res.status(500).json({ data: error, completed: false })
  }
})

router.post('/create', async (req, res) => {
  const {
    torre,
    capacidad,
    nombre,
    user,
    password
  } = req.body
  let data
  // console.log(torre)
  try {
    await User.getPermission2(user, password, async (error, result) => {
      if (error) {
        console.error(error)
        res.status(500).json({ data: error, completed: false })
      } else if (result.password) {
        console.log(result.permission)
        if (result.permission === 1) {
          const towerExists = await Tower.exists({ tower: torre })
          if (towerExists) {
            res.status(500).json({ data: 'La torre ya existe, agregue otro nombre', completed: false })
          } else {
            if (nombre !== undefined) {
              data = new Tower({
                torre,
                capacidad,
                name: nombre
              })
            } else {
              data = new Tower({
                tower: torre,
                capacidad
              })
            }
            const result = data.save()
            res.status(200).json({ data: result, completed: true })
          }
        } else {
          res.status(500).json({ data: 'No tienes los permisos suficientes', completed: false })
        }
      } else {
        res.status(500).json({ data: 'contraseña incorrecta', completed: false })
      }
    })
  } catch (error) {
    res.status(500).json({ data: error, completed: false })
  }
})

module.exports = router
