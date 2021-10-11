import express from 'express'

import Residente from '../models/principal_models/residente'
import Hogar from '../models/Hogar'
const router = express.Router()

// PARA OBTENER LA LISTA DE RESIDENTES PARA LA VISTA DE INGRESO DE VEHICULOS, en la que se busca filtrar por aquellos que tengan parqueadero.PDT(no utulizar esta ruta)
router.get('/residentListProbando', async (req, res) => {
  const populateParqueadero = {
    path: 'vehiculo',
    model: 'vehiculo',
    populate: {
      path: 'parqueadero',
      model: 'parqueadero'
    }
  }

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
    // const x = {}
    // verificarParqueadero.forEach(element => {
    //   if (element.vehiculo[0].parqueadero) {
    //     console.log(element)
    //   }
    // }

    // )
    // console.log(verificarParqueadero)

    // const lista = await Residente.find({ vehiculo: { $all: ['parqueadero': {nombre_Parqueadero:'A2'}] } })

    // const parqueadero = await verificarParqueadero.find({ nombre: 'Ricardo' })
    // // sI NO SE PUEDE PROBAR A RELIAZAR LA CONSUlta con pupulate en una lista sin filtro y luego aplicarle el filtro
    // // const lista = await Residente.find({})
    // .populate('hogar', {
    //   apto_num: 1,
    //   tower: 1,
    //   date: 1

    // })
    // .populate('hogar_habitando', {
    //   apto_num: 1,
    //   tower: 1,
    //   date: 1

    // })
    // .populate(populateParqueadero)

    // console.log(verificarParqueadero)
    // console.log(lista)
    // .populate('vehiculo', {
    //   placa: 1,
    //   marca: 1,
    //   color: 1,
    //   tipo: 1,
    //   datos_extra: 1,
    //   parqueadero: 1
    // })

    // }
    const x = []
    let a = ''
    verificarParqueadero.forEach(element => {
      if (element.vehiculo[0].parqueadero) {
        a = x.push(element)
      }
    }

    )
    console.log(a)
    // res.status(200).json(parqueadero)
    res.status(200).json(x)
  } catch (error) {
    return res.status(400).json({
      mensaje: `Ocurrio un error', ${error}`,
      error
    })
  }
})

// Provivonalmente se a hecho que al postear un vehiculo en porpiedad de una persona, se agregue en el dato "haveParking"de su esquema, el bolean true para realizar un filtrado o consulta
// --------------------------------------
router.get('/residentList', async (req, res) => {
  // const populateParqueadero = {
  //   path: 'vehiculo',
  //   model: 'vehiculo',
  //   populate: {
  //     path: 'parqueadero',
  //     model: 'parqueadero'
  //   }
  // }

  const verificarParqueadero = await Residente.find({ parqueadero: true })
    .populate('hogar', {
      apto_num: 1,
      tower: 1
    })
    .populate('hogar_habitando', {
      apto_num: 1,
      tower: 1
    })
    .populate('vehiculo', {
      placa: 1,
      tipo: 1,
      datos_extra: 1
    })
    .populate('parqueadero', {
      nombre_Parqueadero: 1
    })
    // .populate(populateParqueadero)
  try {
    res.json(verificarParqueadero)
  } catch (error) {
    return res.status(400).json({
      mensaje: `Ocurrio un error' al obtener la lista de los datos de los residentes, ${error}`,
      error
    })
  }
})

// obtiene los datos de residentes
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
      .populate('vehiculo', {
        placa: 1,
        marca: 1,
        color: 1,
        tipo: 1,
        datos_extra: 1
      })
      .populate('parqueadero', {
        nombre_Parqueadero: 1
      })
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
