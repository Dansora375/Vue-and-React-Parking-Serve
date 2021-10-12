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

      mensaje: `Ocurrio un error Ha ocurrido un error al intentar 
      obtener la lista de vehiculos en entrada', ${error}`,
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
      mensaje: `Ocurrio un error al realizar el post de la entrada de vehiculos visitantes', ${error}`,
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
      mensaje: `Ocurrio un error al intentar obtener los visitantes', ${error}`, error
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
        mensaje: `Ocurrio un error al intentar editar un visitante', ${error}`,
        error
      })
    }
  }
})
// Este put se utilizara para modificar el ingreso de un visitante al darle en la vista a terminar parqueadero
router.put('/endParkingVis ', async (req, res) => {
  const {
    id,
    horaSalida
  } = req.body
  try {
    const VisIngresoUpdated = await Entrada_vehiculo.findOneAndUpdate(
      { _id: id },
      { hora_salida: horaSalida, activo: false, ocupado: false },
      { new: true }
    )

    res.status(200).json(VisIngresoUpdated)
  } catch (error) {
    return res.status(400).json({
      mensaje: `Ocurrio un error al terminar el parqueadero del visitante', ${error}`,
      error
    })
  }
})
module.exports = router
