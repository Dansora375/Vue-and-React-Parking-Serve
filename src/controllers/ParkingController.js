import Home from '../models/home'
import EntryResident from '../models/entry.resident'
import Parking from '../models/parking'

module.exports = {

  AssignParkingToHome: async (req, res, next) => {
    const IdHome = req.params.HomeId
    const {
      IdParking

    } = req.body
    try {
      const BringHome = await Home.findById({ _id: IdHome })
      await Parking.findOneAndUpdate({ _id: IdParking }, { home: IdHome, assigned: true }, { new: true })

      BringHome.parking = IdParking
      await BringHome.save()

      res.status(201).send('Actualizacion con exito')
    } catch (error) {
      return next(error)
    }
  },

  // al parecer la parte de crear el ingreso cuando se ejecute
  // llenar parqueadero se hara de forma individual
  // y no dentro de esta misma ruta

  // para usar este middleWare es necesario poner en el requirement los siguientes datos:
  /**
   *
   * idResident haciendo referencia al id que representa al residente
   * entryTimeR: haciendo referencia a la hora a la que se creo la entrada
   * idParking: haciendo referencia al id del parqueadero
   *
   */

  fillParkingResi: async (req, res, next) => {
    // Antes de ejecutar el llenado en parqueadero
    // se debe de crear un ingreso y ed ese ingreso
    // usar su id, como se muestra abajo

    // En la ruta de crear entrada de resientes se le pasara
    // por body el IdParking y el entryTime, IdHome se le puede pasar por params,
    // esta ruta recibira  el IdParking y el entryTime

    const EntryResidentId = req.idResident
    const EntryResidentTime = req.entryTimeR
    const IdParking = req.idParking

    try {
      const updatedParking = await Parking.findByIdAndUpdate(
        { _id: IdParking },
        { lastEntryTime: EntryResidentTime, lastExitTime: null, idLastEntryResident: EntryResidentId, isTaken: true },
        { new: true })
      req.resultParkingUpdate = updatedParking
      req.wasFilled = true
      return next()
      // res.status(200).json(ParkingFill)
    } catch (error) {
      return next(error)
    }
  },

  fillParkingVisi: async (req, res, next) => {
    // Antes de ejecutar el llenado en parqueadero
    // se debe de crear un ingreso y ed ese ingreso
    // usar su id, como se muestra abajo

    // En la ruta de crear entrada de resientes se le pasara
    // por body el IdParking y el entryTime, IdHome se le puede pasar por params,
    // esta ruta recibira  el IdParking y el entryTime

    // const EntryVisitantId = req.idVisitant
    const EntryVisitantTime = req.entryTimeV
    const IdParking = req.idParking
    const EntryVisitanId = req.idVisitant

    try {
      await Parking.findByIdAndUpdate(
        { _id: IdParking },
        { lastEntryTime: EntryVisitantTime, idLastEntryVisitant: EntryVisitanId, lastExitTime: null, isTaken: true },
        { new: true })

      req.wasFilled = true
      return next()
      // res.status(200).json(ParkingFill)
    } catch (error) {
      return next(error)
    }
  },
  // En vaciar parqueadero el edit del ingreso si ira dentro de
  // ella, por lo que no se empleara un ruta individual como se
  // implemento al llenar el parqueadero
  emptyParkingResi: async (req, res, next) => {
    const IdParking = req.params.IdParking
    const {

      IdEntryResident,
      exitTime
    } = req.body
    try {
      // Actualizando el estado de la entrada del
      await EntryResident.findByIdAndUpdate({ _id: IdEntryResident }, { active: false, exitTime: exitTime }, { new: true })

      // Actualizando el estado del entradparqueadero del residente
      const parkingEmpty = await Parking.findByIdAndUpdate(
        { _id: IdParking },
        { lastExitTime: exitTime, isTaken: false },
        { new: true })

      res.status(200).json(parkingEmpty)
    } catch (error) {
      return next(error)
    }
  },

  newParking: async (req, res, next) => {
    const idNeighborhood = req.params.IdNeighborhood

    const {
      parkingName,
      vehicleType,
      personType
    } = req.body

    try {
      const newParking = new Parking({
        name: parkingName,
        vehicleType,
        personType,
        neighborhood: idNeighborhood

      })

      const saveParking = await newParking.save()
      res.json(saveParking)
    } catch (error) {
      return next(error)
    }
  },

  ParkingIsTakenResi: async (req, res, next) => {
    const {
      IdNeighborhood
    } = req.body
    try {
      const Parkings = await Parking.find({ isTaken: false, personType: 'Residente', neighborhood: IdNeighborhood })

      res.status(200).json(Parkings)
    } catch (error) {
      return next(error)
    }
  },

  ParkingIsTakenVisitant: async (req, res, next) => {
    const NeighborhoodId = req.params.IdNeighborhood
    try {
      const Parkings = await Parking.find({ isTaken: false, personType: 'Visitante', neighborhood: NeighborhoodId })

      res.status(200).json(Parkings)
    } catch (error) {
      return next(error)
    }
  },

  ParkingAssigneedFalse: async (req, res, next) => {
    const NeighborhoodId = req.params.IdNeighborhood

    try {
      const parkings = await Parking.find({ assigned: false, personType: 'Residente', neighborhood: NeighborhoodId })

      res.status(200).json(parkings)
    } catch (error) {
      return next(error)
    }
  },

  Parkings: async (req, res, next) => {
    const IdNeighborhood = req.params.IdNeighborhood
    try {
      const Parkings = await Parking.find({ neighborhood: IdNeighborhood })
        .populate('home', {
          name: 1,
          group: 1
        })
        .populate('vehicle', {
          plate: 1,
          carBrand: 1,
          color: 1,
          type: 1,
          extra: 1
        })

      res.status(200).json(Parkings)
    } catch (error) {
      return next(error)
    }
  },

  ParkingMoreInf: async (req, res, next) => {
    const IdParking = req.params.IdParking

    const dataResident = {

      path: 'home',
      select: 'name owner group',
      populate: {
        path: 'owner',
        select: 'name identification telephone '
      }
    }

    const dataGroup = {

      path: 'home',
      select: 'name owner group',
      populate: {
        path: 'group',
        select: 'name homeType '
      }
    }

    const dataVehicle = {
      path: 'vehicle',
      model: 'Vehicle',
      select: 'plate carBrand color type extra'
    }
    const dataEntryVisitant = {
      path: 'idLastEntryVisitant',
      select: 'name identification group homeName plate extra entryTime'
    }
    try {
      const parking = await Parking.findById({ _id: IdParking }, 'name vehicleType personType istaken assigned idLastEntryResident lastEntryTime lastExitTime home vehicle neighborhood idLastEntryVisitant')
        .populate(dataEntryVisitant)
        .populate(dataResident)
        .populate(dataGroup)
        .populate(dataVehicle)

      res.status(200).json(parking)
    } catch (error) {
      return next(error)
    }
  },

  residentsParkings: async (req, res, next) => {
    const IdNeighborhood = req.params.IdNeighborhood

    try {
      const parkings = await Parking.find({ personType: 'Residente', neighborhood: IdNeighborhood })

      res.status(200).json(parkings)
    } catch (error) {
      return next(error)
    }
  },

  visitantsParkings: async (req, res, next) => {
    const IdNeighborhood = req.params.IdNeighborhood

    try {
      const parkings = await Parking.find({ personType: 'Visitante', neighborhood: IdNeighborhood })

      res.status(200).json(parkings)
    } catch (error) {
      return next(error)
    }
  },
  // Probar si funciona xd con el map
  parkingsWithoutVehicle: async (req, res, next) => {
    const IdNeighborhood = req.params.IdNeighborhood

    try {
      const parkings = await Parking.find({ personType: 'Residente', neighborhood: IdNeighborhood })
      const PWithoutVehicle = parkings.map(ele => {
        const data = []
        if (ele.vehicle === undefined || ele.vehicle === null) {
          data.push(ele)
        }
        return data
      })
      res.status(200).json(PWithoutVehicle)
    } catch (error) {
      return next(error)
    }
  }

}
