import express from 'express'

import Residente from '../models/principal_models/residente'
import Hogar from '../models/Hogar'
// import EntradaVehiculo from '../models/principal_models/visitante'
const router = express.Router()

// PARA OBTENER LA LISTA DE RESIDENTES PARA LA VISTA DE INGRESO DE VEHICULOS
router.get('/residentList', async (req, res) => {
  const finalizadas = req.query.fin === '1' || req.query.fin === 'true'
  try {
    let lista
    if (finalizadas) {
      lista = await Residente.find({})
        .populate('hogar', {
          apto_num: 1,
          tower: 1,
          date: 1

        })
        .populate('hogar_habitando', {
          apto_num: 1,
          tower: 1,
          date: 1

        })
        .populate('vehiculo', {
          placa: 1,
          marca: 1,
          color: 1,
          tipo: 1,
          datos_extra: 1,
          parqueadero: 1
        })
        // Agregarpolulate de vehiculo
    } else {
      lista = await Residente.find({ activo: true })
        .populate('hogar', {
          apto_num: 1,
          tower: 1,
          date: 1

        })
        .populate('hogar_habitando', {
          apto_num: 1,
          tower: 1,
          date: 1

        })
        .populate('vehiculo', {
          placa: 1,
          marca: 1,
          color: 1,
          tipo: 1,
          datos_extra: 1,
          parqueadero: 1
        })
        // Agregarpolulate de vehiculo
    }
    res.json(lista)
  } catch (error) {
    return res.status(400).json({
      mensaje: 'Ha ocurrido un error al intentar obtener la lista de datos de residentes  en entrada',
      error
    })
  }
})

// obtiene los datos de residentes sin filtrar si esat activo
router.get('/residentInf', async (req, res) => {
  try {
    const residentes = await Residente.find({})
      .populate('hogar', {
        apto_num: 1,
        tower: 1,
        date: 1

      })
      .populate('hogar_habitando', {
        apto_num: 1,
        tower: 1,
        date: 1

      })
      .populate('vehiculo', {
        placa: 1,
        marca: 1,
        color: 1,
        tipo: 1,
        datos_extra: 1,
        parqueadero: 1
      })
    res.status(200).json(residentes)
  } catch (error) {
    return res.status(400).json({
      mensaje: `Ocurrio un error', ${error}`, error
    })
  }
})

// post para la vista en donde se crearan lso residentes
router.post('/residentInf', async (req, res) => {
  const { body } = req

  Hogar.find({}, async (err, data) => {
  // users is an array which may be empty for no results
    if (err) {
      return
    }
    if (data.length) {
      const {
        nombre,
        cedula,
        telefono,
        apto_num,
        tower

      } = body

      const hogar_habitando = await Hogar.findOne({ apto_num: apto_num, tower: tower })

      const resident = new Residente({
        nombre,
        cedula,
        telefono,
        hogar_habitando: hogar_habitando._id

      })

      try {
        const saveResident = await resident.save()

        hogar_habitando.residents = hogar_habitando.residents.concat(saveResident._id)
        await hogar_habitando.save()

        res.status(201).json(saveResident)
      } catch (error) {
        return res.status(500).json({ mensaje: `Ocurrio un error', ${error}`, error })
      }
    } else {
      const {
        nombre,
        cedula,
        telefono

      } = body

      const resident = new Residente({
        nombre,
        cedula,
        telefono

      })

      try {
        const saveResident = await resident.save()
        res.status(201).json(saveResident)
      } catch (error) {
        return res.status(500).json({ mensaje: `Ocurrio un error', ${error}`, error })
      }
    }
  })
})

module.exports = router
