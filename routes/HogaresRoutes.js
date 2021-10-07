import express, { request } from 'express'

import Hogar from '../models/Hogar'
import Residente from '../models/principal_models/residente'
const router = express.Router()


router.post('/hogares', async (req, res) => {
  const {
    apto_num,
    tower,
    home_owner_CC
  }= req.body


  const home_owner = await Residente.findOne({cedula: home_owner_CC})

  const newhogar = new Hogar({
    apto_num,
    tower,
    date:new Date(),
    home_owner:home_owner._id
  })
  try {
    const saveHogar = await newhogar.save()

    home_owner.hogar= home_owner.hogar.concat(saveHogar._id)
    await home_owner.save()

    res.status(200).json(saveHogar)
  } catch (error) {
    return res.status(500).json({
      mensaje: `Ocurrio un error', ${error}`,
      error
    })
  }
})

router.get('/hogares', async (req, res) => {
  try {
    const hogares=  await Hogar.find({}).populate('home_owner',{
      nombre:1,
      telefono:1,
      placa:1,
      tipo:1,
      marca:1
    })
    res.status(200).json(hogares)
  } catch (error) {
    return res.status(400).json({
      mensaje: `Ocurrio un error', ${error}`, error
    })
  }
})
// router.get('/hogares', async (req, res) => {
//   try {
//     const dthogar = await Hogar.find({}).populate('residentes', {
//       nombre:1,
//       telefono:1,
//       placa:1,
//       apto_num:1,
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

module.exports = router