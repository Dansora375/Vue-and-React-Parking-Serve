import express, { json } from 'express'
import Residente from '../models/principal_models/residente'
import IngresoResident from '../models/principal_models/residentIngreso.js'
const router = express.Router()

router.post('/ingresoResident', async (req, res) => {
  const {
    residentCC
  } = req.body

  const traerResidente = await Residente.findOne({ cedula: residentCC })

  const newIngresoResident = new IngresoResident({
    residente: traerResidente._id,
    hora_entrada: new Date()

  })
  try {
    const saveIngresoR = await newIngresoResident.save()

    res.status(200).json(saveIngresoR)
  } catch (error) {

  }
})

router.get('/ingresoResident', async (req, res) => {
  try {
    // Si desde los datos del residente solo muestra el id del hogar pero no susa datos se podrai probara ajecutar un get con pupulate en residente
    const ingresosResidents = await IngresoResident.find({})
      .populate('residente'{
        nombre:1,
        hogar:1,
        vehiculo:1
        // en el vehiculo se trae el nombre del parqueadero si solo se muestra el id del parqueaderom, probar la mismas solucion que con el hogar
      })
    res.status(200).json(ingresosResidents)
  } catch (error) {

  }
})
