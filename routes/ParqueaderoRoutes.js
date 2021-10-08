import express, { json, Router } from 'express'
import parqueadero from '../models/Parqueadero'
import Hogar from '../models/Hogar'

const router = express.Router()

// ESTO PODRIA SERVIR PARA LA IMPLEMETNACION DEL PUT con el put se piensa utilizar para aditar y agregar los datos de el apto_num y tower, para gerenara la relacion con hogares

// router.put('/parqueadero', async (req, res) => {
//   const { body } = req
//   const {
//     nombre_Parqueadero,
//     apto_num,
//     tower
//   } = body

//   const traerHogar = await Hogar.findOne({ apto_num: apto_num, tower: tower })

//   const editParqueadero = new parqueadero({
//     nombre_Parqueadero,
//     hogar: traerHogar._id
//   })
//   try {
//     const saveParqueadero = await editParqueadero.save()

//     traerHogar.parqueadero = traerHogar.parqueadero.concat(saveParqueadero._id)
//     await traerHogar.save()

//     res.status(201).json(saveParqueadero)
//   } catch (error) {
//     return res.status(400).json({ mensaje: `Ocurrio un error', ${error}`, error })
//   }
// })

// Este post se realizara en primera instancia para crear parqueaderos sin relacion alguna con hogares
router.post('/parqueadero', async (req, res) => {
  const { body } = req
  const { nombre_Parqueadero } = body

  const newParqueadero = new parqueadero({
    nombre_Parqueadero
  })
  try {
    const saveParqueadero = await newParqueadero.save()
    res.status(201).json(saveParqueadero)
  } catch (error) {
    return res.status(500).json({ mensaje: `Ocurrio un error', ${error}`, error })
  }
})

// Este get se usara en el caso de que el parqueadero no tenga relacion con algun hogar
// ParqueaderoNR: el nombre indica parqueadero No Relacionado
router.get('/ParqueaderoNR', async (req, res) => {
  try {
    // Un parqueadero o relacionado con un hogar, tiene la posibilidad de tener un vehiculo asignado
    const parqueaderosNR = await parqueadero.find({})
      .populate('vehiculo', {
        placa: 1,
        marca: 1,
        tipo: 1,
        datos_extra: 1
      })

    res.status(200).json(parqueaderosNR)
  } catch (error) {
    return res.status(400).json({ mensaje: `Ocurrio un error', ${error}`, error })
  }
})

// Este get se usara si en la vista hogares ya se le ha asignad un hogar al parqueadero
router.get('/parqueadero', async (req, res) => {
  try {
    const parqueaderos = await parqueadero.find({})
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
    return res.status(400).json({ mensaje: `Ocurrio un error', ${error}`, error })
  }
})

module.exports = router
