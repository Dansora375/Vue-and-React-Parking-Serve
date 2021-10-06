import express from 'express'

import Residente from '../models/principal_models/residente'
const router = express.Router()

router.get('/residentList', async (req, res) => {
  const finalizadas = req.query.fin == '1' || req.query.fin == 'true'
  try {
    let lista
    if (finalizadas) { lista = await Entrada_vehiculo.find() } 
    else { lista = await Residente.find({ activo: true }) }
    res.json(lista)
  } catch (error) {
    return res.status(400).json({
      mensaje: 'Ha ocurrido un error al intentar obtener la lista de datos de residentes  en entrada',
      error
    })
  }
})

router.get('/residentInf', async (req, res) => {
  try {
    const Inf_ParkDB = await Residente.find()
    res.status(200).json(Inf_ParkDB)
  } catch (error) {
    return res.status(400).json({
      mensaje: `Ocurrio un error', ${error}`, error
    })
  }
})

router.post('/residentInf', async (req, res) => {
  const body = req.body
  try {
    const Inf_ParkDB = await Residente.create(body)
    res.status(201).json(Inf_ParkDB)
  } catch (error) {
    return res.status(500).json({ mensaje: `Ocurrio un error', ${error}`, error })
  }
})


module.exports = router
