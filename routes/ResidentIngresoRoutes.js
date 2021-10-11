import express from 'express'
import Residente from '../models/principal_models/residente'
import IngresoResident from '../models/principal_models/residentIngreso.js'
const router = express.Router()

router.post('/ingresoResident', async (req, res) => {
  const {
    residentCC
  } = req.body

  const traerResidente = await Residente.findOne({ cedula: residentCC })

  const newIngresoResident = new IngresoResident({
    residente: traerResidente._id
    // hora_entrada: new Date()
  })
  try {
    const saveIngresoR = await newIngresoResident.save()

    res.status(200).json(saveIngresoR)
  } catch (error) {
    return res.status(500).json({
      mensaje: `Ocurrio un error', ${error}`,
      error
    })
  }
})

router.get('/ingresoResident', async (req, res) => {
  try {
    // Se enlistan los populate
    const populateVehicle = {
      path: 'residente',
      model: 'Residente',
      populate: {
        path: 'vehiculo',
        model: 'vehiculo',
        populate: {
          path: 'parqueadero',
          model: 'parqueadero',
          select: 'nombre_Parqueadero'
        },
        select: 'placa'
      }
    }

    const populateHogar = {
      path: 'residente',
      populate: {
        path: 'hogar',
        select: 'apto_num tower'
      }
    }

    const populateHogarHabitando = {
      path: 'residente',
      select: 'nombre',
      populate: {
        path: 'hogar_habitando',
        select: 'apto_num tower'
      }
    }

    const ingresosResidents = await IngresoResident.find({ activo: true })
      // .populate(populateApto)
      .populate(populateVehicle)
      .populate(populateHogar)
      .populate(populateHogarHabitando)
    res.status(200).json(ingresosResidents)
  } catch (error) {
    return res.status(500).json({
      mensaje: `Ocurrio un error', ${error}`,
      error
    })
  }
})

module.exports = router
