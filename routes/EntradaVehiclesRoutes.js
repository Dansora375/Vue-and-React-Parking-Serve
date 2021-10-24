/* eslint-disable camelcase */
import express from 'express'

// eslint-disable-next-line camelcase
import Entrada_vehiculo from '../models/principal_models/visitante'
import parqueadero from '../models/Parqueadero'
const router = express.Router()

router.get('/lista', async (req, res) => {
  const populateParking = {
    path: 'parqueadero',
    select: 'nombre_Parqueadero'
  }
  const finalizadas = req.query.fin === '1' || req.query.fin === 'true'
  try {
    let lista
    if (finalizadas) {
      lista = await Entrada_vehiculo.find({})
        .populate(populateParking)
    } else {
      lista = await Entrada_vehiculo.find({ activo: true })
        .populate(populateParking)
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
  // ejemplo de lo que se requiriria para agregar entrada de visitante
  // "nombre": "Paquita",
  //   "cedula":"512003057",
  //   "placa": "JAS-1345",
  //   "apto_num":"103",
  //   "tower":"c",
  //   "tipo": "Carro",
  //   "datos_extra":"Limpiecito",
  //   "parqueadero":"616700257e78425aa0aadc5d"
  try {
    // eslint-disable-next-line camelcase
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
  const {
    id,
    // eslint-disable-next-line camelcase
    hora_salida
  } = req.body
  if (id == null || hora_salida == null) {
    res.send({ data: 'el id y el valor son obligatorios', completed: false })
    // console.log(id, '  ', isEnding)
  } else {
    try {
      await Entrada_vehiculo.findByIdAndUpdate(id, { activo: false, hora_salida }, async (error, result) => {
        if (error) {
          res.send({ data: `${error}`, completed: false })
        } else if (result) {
          await parqueadero.findByIdAndUpdate(result.parqueadero, { Ocupado: false }, (err, resul) => {
            if (err) {
              res.send({ data: `${error}`, completed: false })
            } else {
              res.send({ data: result, completed: true })
            }
          }).clone()
        } else {
          res.send({ data: 'No se pudo actualizar', completed: false })
        }
      }).clone()
      // res.send({ data: salida, completed: true })
    } catch (error) {
      return res.send({ data: `${error}`, completed: false })
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
