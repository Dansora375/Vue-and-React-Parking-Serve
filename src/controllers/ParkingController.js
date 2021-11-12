import Home from '../models/hogar'
import EntryResident from '../models/entry.resident'
import Parking from '../models/parking'

module.exports = {

  AssignParkingToHome: async (req, res, next) => {
    const IdHome = req.params.HomeId
    const {
      IdParking

    } = req.body
    try {
      const BringHome = await Home.findById({
        IdHome
      })
      const updateParking = await Parking.findOneAndUpdate({ _id: IdParking }, { home: IdHome, assigned: true }, { new: true })

      BringHome.parking = updateParking._id
      await BringHome.save()

      res.status(201)
    } catch (error) {
      return next(error)
    }
  },

  // al parecer la parte de crear el ingreso cuando se ejecute
  // llenar parqueadero se hara de forma individual
  // y no dentro de esta misma ruta

  fillParkingResi: async (dataEntryResi, req, res, next) => {
    // Antes de ejecutar el llenado en parqueadero
    // se debe de crear un ingreso y ed ese ingreso
    // usar su id, como se muestra abajo

    // En la ruta de crear entrada de resientes se le pasara
    // por body el IdParking y el entryTime, IdHome se le puede pasar por params,
    // esta ruta recibira  el IdParking y el entryTime por medio del next si todo sale bien

    // dataEntryResi sera un objeto con los siguientes datos
    const EntryResidentId = dataEntryResi._id
    const EntryResidentTime = dataEntryResi.entryTime
    const IdParking = dataEntryResi.IdParking
    // const {
    //   IdParking,
    //   entryTime,
    //   IdHome
    // } = req.body
    try {
      // const newEntryResident = new EntryResident({
      //   home: IdHome
      // })
      // await newEntryResident.save()

      const ParkingFill = await Parking.findByIdAndUpdate(
        { IdParking },
        { lastEntryTime: EntryResidentTime, lastExitTime: null, idLastEntryResident: EntryResidentId, isTaken: true },
        { new: true }
      )

      res.status(200).json(ParkingFill)
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
      // Actualizando el estado de la entrada del residente
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
    const {
      ParkingName,
      vehicleType,
      personType,
      idNeighborhood
    } = req.body

    try {
      const newParking = new Parking({
        name: ParkingName,
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

  residentsParkingsMoreInf: async (req, res, next) => {
    const IdNeighborhood = req.params.IdNeighborhood

    const dataResident = {
      path: 'home',
      model: 'Home',
      populate: {
        path: 'owner',
        model: 'Owner',
        select: 'name identification telephone '
      },
      select: 'name'
    }

    const dataGroup = {
      path: 'home',
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

    try {
      const parkings = await Parking.find({ personType: 'Residente', neighborhood: IdNeighborhood })
        .populate(dataResident)
        .populate(dataGroup)
        .populate(dataVehicle)

      res.status(200).json(parkings)
    } catch (error) {
      return next(error)
    }
  },

  visitantsParkingsMoreInf: async (req, res, next) => {
    const IdNeighborhood = req.params.IdNeighborhood

    const dataResident = {

      path: 'home',
      model: 'Home',
      populate: {
        path: 'owner',
        model: 'Owner',
        select: 'name identification telephone '
      },
      select: 'name'
    }

    const dataGroup = {

      path: 'home',
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

    try {
      const parkings = await Parking.find({ personType: 'Visitante', neighborhood: IdNeighborhood })
        .populate(dataResident)
        .populate(dataGroup)
        .populate(dataVehicle)

      res.status(200).json(parkings)
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
