import express, { request } from 'express'

import Residente from '../models/principal_models/residente'
import Hogar from '../models/Hogar'
const router = express.Router()

router.get('/residentList', async (req, res) => {
  const finalizadas = req.query.fin == '1' || req.query.fin == 'true'
  try {
    let lista
    if (finalizadas) { 
      lista = await Entrada_vehiculo.find()
    } else { lista = await Residente.find({ activo: true }) }
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
    const residentes=  await Residente.find({}).populate('hogar',{
      apto_num:1,
      tower:1,
      date:1

    })
    res.status(200).json(residentes)
  } catch (error) {
    return res.status(400).json({
      mensaje: `Ocurrio un error', ${error}`, error
    })
  }
})

router.post('/residentInf', async (req, res) => {
  const { body }= req
  const { nombre, cedula, telefono, placa, marca, color, tipo, apto_num, tower, datos_extra} =body

  const hogar_habitando= await Hogar.findOne({apto_num:apto_num, tower:tower})

  const resident = new Residente({
    nombre,
    cedula,
    telefono,
    hogar_habitando:hogar_habitando._id,
    placa,
    marca,
    color,
    tipo,
    datos_extra
  })
  try {
    const saveResident = await resident.save()

    hogar_habitando.residents= hogar_habitando.residents.concat(saveResident._id)
    await hogar_habitando.save()

    res.status(201).json(saveResident)
  } catch (error) {
    return res.status(500).json({ mensaje: `Ocurrio un error', ${error}`, error })
  }
})


module.exports = router
