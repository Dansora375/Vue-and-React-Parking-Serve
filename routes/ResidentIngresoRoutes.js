import express from 'express'
import Residente from '../models/principal_models/residente'
import IngresoResident from '../models/principal_models/residentIngreso.js'
const router = express.Router()

router.post('/ingresoResident', async (req, res) => {
  const {
    id
  } = req.body
  try {
    const newIngresoResident = new IngresoResident({
      residente: id
    // hora_entrada: new Date()
    // acordarse de eimplmentar en el put la creacion de un
    // nuevo docuemnto determinando y en un post la edicion
    // determinada
    })

    const saveIngresoR = await newIngresoResident.save()

    res.status(200).json(saveIngresoR)
  } catch (error) {
    return res.status(500).json({
      mensaje: `Ocurrio un error al agregar el ingreso de un resdente', ${error}`,
      error
    })
  }
})

// GET para los ingresos que etan filtrados por activo :true yq eu tenga parqueadero
router.get('/ingresoResident', async (req, res) => {
  // Se enlistan los populate
  const populateVehicle = {
    path: 'residente',
    model: 'Residente',
    populate: {
      path: 'vehiculo',
      match: { haveParq: true },
      model: 'vehiculo',
      populate: {
        path: 'parqueadero',
        model: 'parqueadero',
        select: 'nombre_Parqueadero '
      },
      select: 'placa tipo datos_extra haveParq marca color'
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
    select: 'nombre cedula telefono',
    populate: {
      path: 'hogar_habitando',
      select: 'apto_num tower'
    }
  }
  try {
    const ingresosResidents = await IngresoResident.find({ activo: true })
      // .populate(populateApto)
      .populate(populateVehicle)
      .populate(populateHogar)
      .populate(populateHogarHabitando)

    res.status(200).json(ingresosResidents)
  } catch (error) {
    return res.status(500).json({
      mensaje: `Ocurrio un error al obtener los ingresos de los residentes', ${error}`,
      error
    })
  }
})

// GET para los ingresos que solo estaran filtrados por
// aquellos que tengan parqueadero
router.get('/ingresoResidentNF', async (req, res) => {
  // Se enlistan los populate
  const populateVehicle = {
    path: 'residente',
    model: 'Residente',
    populate: {
      path: 'vehiculo',
      match: { haveParq: true },
      model: 'vehiculo',
      populate: {
        path: 'parqueadero',
        model: 'parqueadero',
        select: 'nombre_Parqueadero '
      },
      select: 'placa tipo datos_extra haveParq marca color'
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
    select: 'nombre cedula telefono',
    populate: {
      path: 'hogar_habitando',
      select: 'apto_num tower'
    }
  }
  try {
    const ingresosResidents = await IngresoResident.find({ })
      // .populate(populateApto)
      .populate(populateVehicle)
      .populate(populateHogar)
      .populate(populateHogarHabitando)

    res.status(200).json(ingresosResidents)
  } catch (error) {
    return res.status(500).json({
      mensaje: `Ocurrio un error al obtener los ingresos de los residentes', ${error}`,
      error
    })
  }
})

// Este put se utilizara para implementarlo en cuanto en la vista se le de
// llenar parqueadero
// del ingreso de un "vehiculo Residente"

// router.put('/ingresoResident', async (req, res) => {
//   const {
//     id,
//     horaSalida
//   } = req.body
//   try {
//     const ResIngresoUpdated = await IngresoResident.findOneAndUpdate(
//       { _id: id },
//       { hora_salida: horaSalida, activo: true, ocupado: true },
//       { new: true }
//     )

//     res.status(200).json(ResIngresoUpdated)
//   } catch (error) {
//     return res.status(400).json({
//       mensaje: `Ocurrio un error al terminar el parqueadero del residente', ${error}`,
//       error
//     })
//   }
// })

// PAARA VACIAR INGRESO O PARQUEADERO
router.put('/salidaResident', async (req, res) => {
  const {
    id,
    horaSalida
  } = req.body
  try {
    const ResIngresoUpdated = await IngresoResident.findOneAndUpdate(
      { _id: id },
      { hora_salida: horaSalida, activo: false, ocupado: false },
      { new: true }
    )

    res.status(200).json(ResIngresoUpdated)
  } catch (error) {
    return res.status(400).json({
      mensaje: `Ocurrio un error al terminar el parqueadero del residente', ${error}`,
      error
    })
  }
})
module.exports = router
