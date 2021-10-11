import express from 'express'

import Hogar from '../models/Hogar'
import Residente from '../models/principal_models/residente'
const router = express.Router()

router.post('/hogares', async (req, res) => {
  const {
    aptoNum,
    tower,
    homeOwnerCC
  // Se debe hacer en la vista obligatorio que se ingrese el CC DE PROPIETARIO EDL HOGAR
  } = req.body

  const homeOwner = await Residente.findOne({ cedula: homeOwnerCC })

  const newhogar = new Hogar({
    apto_num: aptoNum,
    tower,
    home_owner: homeOwner._id
  })
  try {
    const saveHogar = await newhogar.save()

    homeOwner.hogar = homeOwner.hogar.concat(saveHogar._id)
    await homeOwner.save()

    res.status(200).json(saveHogar)
  } catch (error) {
    return res.status(500).json({
      mensaje: `Ocurrio un error al crear un hogar', ${error}`,
      error
    })
  }
})

router.get('/hogares', async (req, res) => {
  try {
    const parqAndVehicle = {
      path: 'parqueadero',
      model: 'parqueadero',
      populate: {
        path: 'vehiculo',
        model: 'vehiculo',
        select: 'placa marca tipo'
      },
      select: 'nombre_Parqueadero assigned'
    }
    const hogares = await Hogar.find({})
      .populate('home_owner', {
        nombre: 1,
        telefono: 1

      }).populate('residents', {
        nombre: 1

      })
      .populate(parqAndVehicle)
      // .populate('parqueadero', {
      //   nombre_Parqueadero: 1,
      //   vehiculo: 1,
      //   assigned: 1

    // })
    res.status(200).json(hogares)
  } catch (error) {
    return res.status(400).json({
      mensaje: `Ocurrio un error al obtener los hogares', ${error}`, error
    })
  }
})

module.exports = router

// router.get('/hogares', async (req, res) => {
//   try {
//     const dthogar = await Hogar.find({}).populate('residentes', {
//       nombre:1,
//       telefono:1,
//       placa:1,
//       aptoNum:1,
//       tipo:1,
//       tower:1
//     })
//     res.status(200).json(dthogar)
//   } catch (error) {
//     return res.status(400).json({
//       message: `'ocurrio un error al obtener los datos para hogares',${error}`, error
//     })
//   }
// }
// )

// router.get('/hogares', function (req, res){
//   Hogar.find({},function (err, hogares){
//     res.status(200).send(hogares);
//   });
// });
