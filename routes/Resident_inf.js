import express from 'express'

import Residente from '../models/principal_models/residente'
import Hogar from '../models/Hogar'
// import EntradaVehiculo from '../models/principal_models/visitante'
const router = express.Router()

// Populate utilizado en las rutas get
const populateParqueadero = {
  path: 'vehiculo',
  model: 'vehiculo',
  populate: {
    path: 'parqueadero',
    model: 'parqueadero',
    select: 'nombre_Parqueadero'
  },
  select: 'placa tipo '
}
// PARA OBTENER LA LISTA DE RESIDENTES PARA LA VISTA DE INGRESO DE VEHICULOS, en la que se busca filtrar por aquellos que tengan parqueadero.
router.get('/residentList', async (req, res) => {
  const data = []
  try {
    const verificarParqueadero = await Residente.find({ })
      .populate('hogar', {
        apto_num: 1,
        tower: 1,
        date: 1
      })
      .populate('hogar_habitando', {
        apto_num: 1,
        tower: 1,
        date: 1
      })
      .populate(populateParqueadero)

    verificarParqueadero.forEach(element => {
      for (const e of element.vehiculo) {
        if (e.parqueadero) {
          // console.log(e, '\n')
          // console.log(element)
          data.push(element)
          // res.json(element)
        }
      }
    })
    res.json(data)
    // res.status(200).json(parqueadero)
    // res.status(200).json(verificarParqueadero)
  } catch (error) {
    return res.status(400).json({
      mensaje: `Ocurrio un error al obtener la lista de residentes', ${error}`,
      error
    })
  }
})

// obtiene los datos de residentes sin ningun filtro
router.get('/residentInf', async (req, res) => {
  try {
    const residentes = await Residente.find({})
      .populate('hogar', {
        apto_num: 1,
        tower: 1,
        date: 1
      })
      .populate('hogar_habitando', {
        apto_num: 1,
        tower: 1,
        date: 1
      })
      .populate(populateParqueadero)

    res.status(200).json(residentes)
  } catch (error) {
    return res.status(400).json({
      mensaje: `Ocurrio un error al intentar obtener los datos de los residentes', ${error}`,
      error
    })
  }
})

router.post('/residentInf', async (req, res) => {
  const { body } = req
  const {
    nombre,
    cedula,
    telefono,
    apto_num,
    tower
  } = body

  Hogar.findOne({ apto_num: apto_num, tower: tower }, async (err, data) => {
    if (err) {
      return
    } if (data) {
      // Sepodria mejorar el timepo de post de una nota si no se hace doble consulta ?
      const hogar_habitando = await Hogar.findOne({ apto_num: apto_num, tower: tower })

      const resident = new Residente({
        nombre,
        cedula,
        telefono,
        hogar_habitando: hogar_habitando._id
      })

      try {
        const saveResident = await resident.save()

        hogar_habitando.residents = hogar_habitando.residents.concat(saveResident._id)
        await hogar_habitando.save()

        res.status(201).json(saveResident)
      } catch (error) {
        return res.status(500).json({ mensaje: `Ocurrio un error al intentar agregar un residente', ${error}`, error })
      }
    } else {
      const resident = new Residente({
        nombre,
        cedula,
        telefono
      })

      try {
        const saveResident = await resident.save()
        res.status(201).json(saveResident)
      } catch (error) {
        return res.status(500).json({
          mensaje: `Ocurrio un error al intentar agregar un residente', ${error}`, error
        })
      }
    }
  })
})

module.exports = router

// router.get('/residentList', async (req, res) => {
//   // const populateParqueadero = {
//   //   path: 'vehiculo',
//   //   model: 'vehiculo',
//   //   populate: {
//   //     path: 'parqueadero',
//   //     model: 'parqueadero'
//   //   }
//   // }
//   try {
//     const verificarParqueadero = await Residente.find({ })
//       .populate('hogar', {
//         apto_num: 1,
//         tower: 1
//       })
//       .populate('hogar_habitando', {
//         apto_num: 1,
//         tower: 1
//       })
//       .populate('vehiculo', {
//         placa: 1,
//         tipo: 1,
//         datos_extra: 1
//       })
//       .populate('parqueadero', {
//         nombre_Parqueadero: 1
//       })
//     // .populate(populateParqueadero)
//     // verificarParqueadero.forEach(element => {
//     //   if (element.parqueadero) {
//     //     res.json(element)
//     //   }
//     // })
//     res.json(verificarParqueadero)
//     // const parqueadero = verificarParqueadero.find({ parqueadero: { nombre_Parqueadero: 'A-1' } })
//   } catch (error) {
//     return res.status(400).json({
//       mensaje: `Ocurrio un error' al obtener la lista de los datos de los residentes, ${error}`,
//       error
//     })
//   }
// })
