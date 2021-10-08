import express from 'express'

import Entrada_vehiculo from '../models/principal_models/visitante'
const router = express.Router()

router.get('/lista', async (req, res) => {
  const finalizadas = req.query.fin === '1' || req.query.fin === 'true'
  try {
    let lista
    if (finalizadas) {
      lista = await Entrada_vehiculo.find()
    } else {
      lista = await Entrada_vehiculo.find({ activo: true })
    }
    res.json(lista)
  } catch (error) {
    return res.status(400).json({
      mensaje: 'Ha ocurrido un error al intentar obtener la lista de vehiculos en entrada',
      error
    })
  }
})

// Funcion para la entrada de un item nuevo
router.post('', async (req, res) => {
  const body = req.body
  try {
    const entrada_nuevo = await Entrada_vehiculo.create(body)
    res.status(200).json(entrada_nuevo)
  } catch (error) {
    return res.status(500).json({
      mensaje: `Ocurrio un error', ${error}`,
      error
    })
  }
})

router.get('', async (req, res) => {
  try {
    const InfParkDB = await Entrada_vehiculo.find()
    res.status(200).json(InfParkDB)
  } catch (error) {
    return res.status(400).json({
      mensaje: `Ocurrio un error', ${error}`, error
    })
  }
})

// funcion para actualizar el estado de un registro
router.put('/salida', async (req, res) => {
  const id = req.query.id
  const isEnding = req.query.terminado
  if (id == null || isEnding == null) {
    res.json({ error: 'el id y el valor son obligatorios' })
    console.log(id, '  ', isEnding)
  } else {
    try {
      const salida = await Entrada_vehiculo.findByIdAndUpdate(id, { activo: !isEnding })
      res.json(salida)
    } catch (error) {
      return res.status(400).json({
        mensaje: 'Ocurrio un error al actualizar el dato',
        error
      })
    }
  }
})

module.exports = router
