import entryR from '../models/entry.resident'
import entryV from '../models/entry.visitant'

module.exports = {
  newEntryResident: async (req, res, next) => {
    // los ids llega por parametro de link a la ruta
    const IdNeighborhood = req.params.IdNeighborhood
    const IdHome = req.params.HomeId
    // console.log(IdHome)
    // el dato 'home' se consigue por medio del
    // middleware/controller 'VehicleAndParking2'
    const home = req.home
    // con el dato de home se puede consultar los datos de type y plate dado el populate
    const {
      type,
      plate
    } = home.parking.vehicle

    // el dato del tiempo es opcional dado que
    // el Schema correspondiente posee valores por defecto
    const {
      entryTime
    } = req.body
    // console.log('etsoy aqui')
    try {
      // creando la entrada con los datos recogidos
      const entryResident = new entryR({
        entryTime,
        neighborhood: IdNeighborhood,
        home: IdHome,
        vehicleType: type,
        plate
      })

      // subiendo la entrada a la base de mongo
      await entryResident.save((error, result) => {
        if (error) next(error)
        else if (result) {
          // cargando algunos resultados para posterior uso en otros middlewares
          req.idResident = entryResident._id
          req.entryTimeR = entryResident.entryTime
          req.idParking = home.parking._id
          req.result = result
          return next()
          // res.json(result)
        } else {
          req.notResultMessage = 'It couldnt be completed the task, please try again or contact to support'
        }
      })
      // console.log(home, entryResident)
    } catch (error) {
      next(error)
    }
  },
  newEntryVisitant: async (req, res, next) => {
    const {
      name,
      identification,
      group,
      homeName,
      plate,
      vehicleType,
      personToVisit,
      extra
    } = req.body

    const neighborhood = req.params.IdNeighborhood
    const parking = req.params.ParkingId

    try {
      const entryVisitant = new entryV({
        name,
        identification,
        group,
        homeName,
        plate,
        vehicleType,
        personToVisit,
        neighborhood,
        parking,
        extra
      })
      await entryVisitant.save((error, result) => {
        if (error) next(error)
        else if (result) {
          // cargando algunos resultados para posterior uso en otros middlewares
          req.idVisitant = entryVisitant._id
          req.entryTimeV = entryVisitant.entryTime
          req.idParking = parking
          req.result = result
          return next()
          // res.json(result)
        } else {
          req.notResultMessage = 'It couldnt be completed the task, please try again or contact to support'
        }
        // req.
      })
    } catch (error) {
      next(error)
    }
  },

  listEntryResident: async (req, res, next) => {
    // console.log(req.params)
    const neighborhood = req.params.IdNeighborhood

    // validando que se halla entregado el id
    if (!neighborhood) {
      res.status(403)
      return res.send({ messsage: 'No se pudo completar la peticion ya que no se proporciono el id del conjunto' })

      // next(error)
    }

    try {
      await entryR.find({ neighborhood, active: true }, (error, result) => {
        if (error) { next(error) }
        req.listEntryR = result
        next()
      }).clone()
    } catch (error) {
      next(error)
    }
  },

  listEntryVisitants: async (req, res, next) => {
    // console.log(req.params)
    const neighborhood = req.params.IdNeighborhood

    // validando que se halla entregado el id
    if (!neighborhood) {
      res.status(403)
      return res.send({ messsage: 'No se pudo completar la peticion ya que no se proporciono el id del conjunto' })
    }

    try {
      await entryV.find({ neighborhood, active: true }, (error, result) => {
        if (error) { next(error) }
        req.listEntryV = result
        next()
      }).clone()
    } catch (error) {
      next(error)
    }
  },

  MoreInfoEntryResident: async (req, res, next) => {
    // console.log(req.params)
    const idEntryResi = req.params.idEntryResi

    // validando que se halla entregado el id
    if (!idEntryResi) {
      res.status(403)
      return res.send({ messsage: 'No se pudo completar la peticion ya que no se proporciono el id de la entrada' })

      // next(error)
    }

    try {
      await entryR.findById({ _id: idEntryResi }, (error, result) => {
        if (error) { next(error) }
        req.entryResi = result
        next()
      }).clone()
    } catch (error) {
      next(error)
    }
  },
  MoreInfoVisitants: async (req, res, next) => {
    // console.log(req.params)
    const idEntryVisi = req.params.idEntryVisi
    // validando que se halla entregado el id
    if (!idEntryVisi) {
      res.status(403)
      return res.send({ messsage: 'No se pudo completar la peticion ya que no se proporciono el id del conjunto' })
    }

    try {
      await entryV.find({ _id: idEntryVisi }, (error, result) => {
        if (error) { next(error) }
        req.entryVisi = result
        next()
      }).clone()
    } catch (error) {
      next(error)
    }
  }
}
