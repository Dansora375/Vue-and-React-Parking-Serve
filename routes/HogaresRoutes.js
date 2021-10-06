import express from 'express'

import Hogar from '../models/Hogares'
const router = express.Router()


router.post('/hogares', async (req, res) => {
  const body = req.body
  try {
    const add_hogar = await Hogar.create(body)
    res.status(200).json(add_hogar)
  } catch (error) {
    return res.status(500).json({
      mensaje: `Ocurrio un error', ${error}`,
      error
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

router.get('/hogares', function (req, res){
  Hogar.find({},function (err, hogares){
    res.status(200).send(hogares);
  });
});
module.exports = router