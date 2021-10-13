import express from 'express'

import Hogar from '../models/Hogar'
import Residente from '../models/principal_models/residente'
import User from '../models/user'
const router = express.Router()

router.post('/hogares', async (req, res) => {
  const {
    aptoNum,
    tower,
    homeOwnerCC,
    user,
    password
  // Se debe hacer en la vista obligatorio que se ingrese el CC DE PROPIETARIO EDL HOGAR
  } = req.body
  let newHogar
  let homeOwner
  try {
    // Consultando los permisos del usuario en cuestion
    await User.getPermission2(user, password, async (error, result) => {
      if (error) {
        res.send({ data: error, completed: false })
      } else if (result.password) {
        // ahora se procede a validar si el usuario tiene los permisos para esta ruta
        // en este caso, permisos de nivel 1
        if (result.permission === 1) {
          // caso en el cual tenga el permiso deseado
          // se procede con la consulta/inserción habitual
          if (homeOwnerCC !== undefined) {
            homeOwner = await Residente.findOne({ cedula: homeOwnerCC })
            newHogar = new Hogar({
              apto_num: aptoNum,
              tower,
              home_owner: homeOwner._id
            })
          } else {
            newHogar = new Hogar({
              apto_num: aptoNum,
              tower
              // home_owner: homeOwner._id
            })
          }
          const saveHogar = await newHogar.save()
          if (homeOwnerCC !== undefined) {
            homeOwner.hogar = homeOwner.hogar.concat(saveHogar._id)
            await homeOwner.save()
          }
          res.send({ data: saveHogar, completed: true })
        } else {
          // en este punto, el usuario no tiene permisos para completar la función
          res.send({ data: 'No tienes los permisos suficientes', completed: false })
        }
      } else {
        // llegados a este punto, la contraseña dada es incorrecta
        res.send({ data: 'Contraseña incorrecta', completed: false })
      }
    })
  } catch (error) {
    console.log('2:', error)
    return res.send({
      data: error,
      completed: false
    })
  }
})

router.get('/hogares', async (req, res) => {
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
  try {
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
