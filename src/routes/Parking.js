
const express = require('express')
const router = express.Router()
const controller = require('../controllers/ParkingController')
  // Se utilizara para asignar un parqueadero a un hogar

router.put('/ToHome', controller.AssignParkingToHome)

//  se piensa utilizar para  para CAMBIAR LA PROPIEDAD  del dato Ocupado a true en la vista de
// Ingreso cuando se seleccione un aprqueadero

router.put('/parqueaderoIngreso2', async (req, res) => {
  // DEFINIR QUE DATOS SE PIENSAN ENVIAR PARA DEFINIR QUE
  // PARQUEADERO SE EDITARA AQU ABAJO
  const {
    id,
    ocupado

    // Mirar si se podrai dejar con el id edl parq
  } = req.body

  try {
    await Parqueadero.findByIdAndUpdate({ _id: id }, { Ocupado: ocupado }, { new: true }, (error, result) => {
      if (error) {
        res.send({ data: `${error}`, completed: false })
      } else if (result) {
        res.send({ data: result, completed: true })
      } else {
        res.send({ data: 'No se pudo realizar la accion', completed: false })
      }
    })
  } catch (error) {
    return res.send({
      data: `${error}`,
      completed: false
    })
  }
})

// Esta se utilizara cuando se de en crear un ingreso o en
// llenar parqueadero junto con la ruta para postear un ingreso de residente
router.put('/parqueaderoIngresoResi', controller.fillParking)

// Esta se utilizara cuando se de en terminar un ingreso o en
// vaciar parqueadero junto con la ruta para put del ingreso
// de residente
router.put('/parqueaderoSalidaResi', async (req, res) => {
  const {
    id,
    horaSalida
  } = req.body
  try {
    const ResSalida = await Parqueadero.findOneAndUpdate(
      { _id: id },
      { hora_salida: horaSalida, Ocupado: false },
      { new: true }
    )

    res.status(200).json(ResSalida)
  } catch (error) {
    return res.status(400).json({
      mensaje: `Ocurrio un error al terminar el parqueadero del residente', ${error}`,
      error
    })
  }
})
// Este post se realizara en primera instancia para crear parqueaderos sin relacion alguna con hogares
router.post('/parqueadero', async (req, res) => {
  const {
    nombreParqueadero,
    tipoVehicle,
    tipoPersonIngr
  } = req.body
  // Por ahora no habra posibilidad de dejar parqueadero sin asignarle un tipo de vehiculo, para posterior implementacion se podria agregar que sea opcional
  const newParqueadero = new Parqueadero({
    nombre_Parqueadero: nombreParqueadero,
    tipoVehicle,
    tipoPersonIngr

  })
  try {
    const saveParqueadero = await newParqueadero.save()
    res.json(saveParqueadero)
  } catch (error) {
    return res.status(500).json({
      mensaje: `Ocurrio un error al crear un parqueadero', ${error}`,
      error
    })
  }
})

// Get para obtener los parqueaderos que se usaran en los
// select de los ingresos de vehiculos PARA VISITANTES; se filtraran por
// aquellos que tengan el dato "Ocupado :false"
router.get('/parqueaderoIngresoVis', async (req, res) => {
  try {
    await Parqueadero.find({ Ocupado: false, tipoPersonIngr: 'Visitante' }, (error, result) => {
      if (error) {
        res.send({ data: error.message, completed: false })
      } else if (result) {
        res.send({ data: result, completed: true })
      } else {
        res.send({ data: 'no se pudieron listar los parqueaderos', completed: false })
      }
    }).clone
    // .populate('hogar', {
    //   apto_num: 1,
    //   tower: 1
    // })
    // .populate('vehiculo', {
    //   placa: 1,
    //   marca: 1,
    //   tipo: 1,
    //   datos_extra: 1
    // })

    // Sise necesita obtener los datos populados de vehiculos para
    // este get, solo descomentar los de arriba

    // res.send({ data: parqueaderos, completed: true })
  } catch (error) {
    return res.send({
      data: `Ocurrio un error al obtener un parqueadero', ${error}`,
      completed: false
    })
  }
})

// Get para obtener los parqueaderos que se usaran en los
// select de los ingresos de vehiculos PARA RESIDENTES; se filtraran por
// aquellos que tengan el dato "Ocupado :false TAMBIEN"
router.get('/parqueaderoIngresoRes', async (req, res) => {
  try {
    const parqueaderos = await Parqueadero.find({ Ocupado: false, tipoPersonIngr: 'Residente' })
    // .populate('hogar', {
    //   apto_num: 1,
    //   tower: 1
    // })
    // .populate('vehiculo', {
    //   placa: 1,
    //   marca: 1,
    //   tipo: 1,
    //   datos_extra: 1
    // })

    // Sise necesita obtener los datos populados de vehiculos para
    // este get, solo descomentar los de arriba

    res.status(200).json(parqueaderos)
  } catch (error) {
    return res.status(400).json({
      mensaje: `Ocurrio un error al obtener un parqueadero', ${error}`,
      error
    })
  }
})

// get para poder enlistar los parqueaderos en los select de los hogares
// estos estaran filtrados por aquellos que tengan como dato
// "Assingned:false" y que el "tipoPersonIngr:Residente", ya que los unicos que tendran relacio
router.get('/parqueaderoHogares', async (req, res) => {
  try {
    // Aquiagregar si en los hogares se filtrara para solo poder asiganr
    // parqueadero tipo residente au hogar o apto
    const parqueaderos = await Parqueadero.find({ assigned: false })
    // .populate('hogar', {
    //   apto_num: 1,
    //   tower: 1
    // })
    // .populate('vehiculo', {
    //   placa: 1,
    //   marca: 1,
    //   tipo: 1,
    //   datos_extra: 1
    // })

    // Sise necesita obtener los datos populados de vehiculos para
    // este get, solo descomentar los de arriba

    res.status(200).json(parqueaderos)
  } catch (error) {
    return res.status(400).json({
      mensaje: `Ocurrio un error al obtener un parqueadero', ${error}`,
      error
    })
  }
})

// get para obtener parqueaderos sin ningun tipo de filtro
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

// get para obtener parqueaderos para la vista ed parqueaderos
// que sean de tipo:Residente
router.get('/viewParqueadero/Resident', async (req, res) => {
  const dataResident = {
    path: 'vehiculo',
    model: 'vehiculo',
    select: 'placa marca color tipo datos_extra',
    populate: {
      path: 'ResidentOwner',
      model: 'Residente',
      select: 'nombre cedula telefono'
    }

  }

  try {
    const parqueaderos = await Parqueadero.find({ tipoPersonIngr: 'Residente' })
      .populate(dataResident)
      .populate('hogar', {
        apto_num: 1,
        tower: 1
      })

    res.status(200).json(parqueaderos)
  } catch (error) {
    return res.status(400).json({
      mensaje: `Ocurrio un error al obtener un parqueadero', ${error}`,
      error
    })
  }
})

// get para obtener parqueaderos para la vista ed parqueaderos
// que sean de tipo:Visitante
router.get('/viewParqueadero/Visitant', async (req, res) => {
  const dataResident = {
    path: 'vehiculo',
    model: 'vehiculo',
    select: 'placa marca color tipo datos_extra',
    populate: {
      path: 'ResidentOwner',
      model: 'Residente',
      select: 'nombre cedula telefono'
    }

  }

  try {
    const parqueaderos = await Parqueadero.find({ tipoPersonIngr: 'Visitante' })
      .populate(dataResident)
      .populate('hogar', {
        apto_num: 1,
        tower: 1
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
