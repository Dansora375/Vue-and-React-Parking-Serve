import Vehicle from '../models/vehicle'

module.exports = {

  newVehicle: async (req, res, next) => {
    const IdNeighborhood = req.params.IdNeighborhood
    const {
      parking,
      plate,
      carBrand,
      color,
      type,
      extra
    } = req.body

    try {
      const newVehicle = new Vehicle({
        parking,
        plate,
        carBrand,
        color,
        type,
        extra,
        neighborhood: IdNeighborhood
      })
      const savedVehicle = await newVehicle.save()

      res.status(200).json(savedVehicle)
    } catch (error) {
      return next(error)
    }
  },
  Vehicles: async (req, res, next) => {
    const IdNeighborhood = req.params.IdNeighborhood

    try {
      const vehicles = await Vehicle.find({ neighborhood: IdNeighborhood })
      // Si se edsea que no se edvuelvan todos los datos
      // al ejecutar la busqueda se puede especificar cuales
      res.status(200).json(vehicles)
    } catch (error) {
      return next(error)
    }
  },

  vehiclesMoreInfo: async (req, res, next) => {
    const IdVehicle = req.params.IdVehicle

    const populateOwner = {
      path: 'parking',
      populate: {
        path: 'home',
        populate: {
          path: 'owner',
          select: 'name identification'
        },
        select: 'name'
      },
      select: 'name'
    }

    try {
      const vehicles = await Vehicle.findById({ IdVehicle })
        .populate(populateOwner)

      res.status(200).json(vehicles)
    } catch (error) {
      return next(error)
    }
  },

  updateVehicle: async (req, res, next) => {
    const IdVehicle = req.params.IdVehicle
    const {
      plate,
      carBrand,
      color,
      type,
      extra
    } = req.body
    try {
      const updateVehicle = await Vehicle.findByIdAndUpdate({ IdVehicle },
        {
          plate,
          carBrand,
          color,
          type,
          extra
        }, { new: true })

      res.status(200).json(updateVehicle)
    } catch (error) {
      return next(error)
    }
  },

  deleteVehicle: async (req, res, next) => {
    const IdVehicle = req.params.IdVehicle

    try {
      await Vehicle.findByIdAndRemove({ IdVehicle })

      res.status(200)
    } catch (error) {
      return next(error)
    }
  }
}
