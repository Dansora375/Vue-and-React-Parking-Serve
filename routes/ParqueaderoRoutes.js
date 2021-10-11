import express from 'express'
import Parqueadero from '../models/Parqueadero'
import Hogar from '../models/Hogar'

const router = express.Router()

// ESTO PODRIA SERVIR PARA LA IMPLEMETNACION DEL PUT con el put se piensa utilizar para aditar y agregar los datos de el apto_num y tower, para gerenara la relacion con hogares

router.put('/parqueadero', async (req, res) => {
  const {
    nombreParqueadero,
    aptoNum,
    tower
  } = req.body

  const traerHogar = await Hogar.findOne({
    apto_num: aptoNum, tower: tower
  })
  const traerParqueadero = await Parqueadero.findOne({
    nombre_Parqueadero: nombreParqueadero
  })
  // const IdParq = traerParqueadero._id
  try {
    const updatedParq = await Parqueadero.findOneAndUpdate({ _id: traerParqueadero._id }, { hogar: traerHogar._id, assigned: true }, { new: true })
    // const saveUpdate = await updatedParq.save()
    // console.log(updatedParq)
    traerHogar.parqueadero = updatedParq._id
    await traerHogar.save()

    res.status(201).json(updatedParq)
  } catch (error) {
    return res.status(400).json({
      mensaje: `Ocurrio un error al editar el parqueadero', ${error}`,
      error
    })
  }
})

// Este post se realizara en primera instancia para crear parqueaderos sin relacion alguna con hogares
router.post('/parqueadero', async (req, res) => {
  const { nombre_Parqueadero } = req.body

  const newParqueadero = new Parqueadero({
    nombre_Parqueadero
  })
  try {
    const saveParqueadero = await newParqueadero.save()
    res.status(201).json(saveParqueadero)
  } catch (error) {
    return res.status(500).json({
      mensaje: `Ocurrio un error al crear un parqueadero', ${error}`,
      error
    })
  }
})

router.get('/parqueadero', async (req, res) => {
  try {
    const parqueaderos = await Parqueadero.find({})
      .populate('hogar', {
        apto_num: 1,
        tower: 1
      })
      .populate('vehiculo', {
        placa: 1,
        marca: 1,
        tipo: 1,
        datos_extra: 1
      })

    res.status(200).json(parqueaderos)
  } catch (error) {
    return res.status(400).json({
      mensaje: `Ocurrio un error al obtener un parqueadero', ${error}`,
      error
    })
  }
})

module.exports = router

// Este get se usara en el caso de que el parqueadero no tenga relacion con algun hogar
// // ParqueaderoNR: el nombre indica parqueadero No Relacionado
// router.get('/ParqueaderoNR', async (req, res) => {
//   try {
//     // Un parqueadero no relacionado con un hogar, tiene la posibilidad de tener un vehiculo asignado
//     const parqueaderosNR = await parqueadero.find({})
//       .populate('vehiculo', {
//         placa: 1,
//         marca: 1,
//         tipo: 1,
//         datos_extra: 1
//       })

//     res.status(200).json(parqueaderosNR)
//   } catch (error) {
//     return res.status(400).json({ mensaje: `Ocurrio un error', ${error}`, error })
//   }
// })
