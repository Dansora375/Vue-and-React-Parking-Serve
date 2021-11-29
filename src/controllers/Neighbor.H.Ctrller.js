import Neighborhood from '../models/neighborhood'

module.exports = {

  newNeighborhood: async (req, res, next) => {
    const {
      name,
      address,
      password
    } = req.body

    try {
      const newNeighborhood = new Neighborhood({ name, address, password })
      const saveNeighborhood = await newNeighborhood.save()
      res.status(200).json(saveNeighborhood)
    } catch (error) {
      return next(error)
    }
  },

  neighborhoods: async (req, res, next) => {
    try {
      await Neighborhood.find({}, ' _id name address', (error, result) => {
        if (error) {
          return next(error)
        } else {
          res.status(200).json(result)
        }
      }).clone()
    } catch (error) {
      return next(error)
    }
  },

  Neighborhood: async (req, res, next) => {
    const {
      NeighborhoodId
    } = req.body
    try {
      const Neighborhoods = await Neighborhood.findById({ _id: NeighborhoodId })
      res.status(200).json(Neighborhoods)
    } catch (error) {
      return next(error)
    }
  },

  updateNeighborhood: async (req, res, next) => {
    const {
      name,
      adress,
      password

    } = req.body
    try {
      const NeighborhoodToUpdate = await Neighborhood.findOneAndUpdate({ name }, { name, adress, password })
      res.status(200).json(NeighborhoodToUpdate)
    } catch (error) {
      return next(error)
    }
  },

  deleteNeighborhood: async (req, res, next) => {
    const {
      NeighborhoodId

    } = req.body
    try {
      const NeighborhoodToDelete = await Neighborhood.findByIdAndRemove({ NeighborhoodId })
      res.status(200).json(NeighborhoodToDelete)
    } catch (error) {
      return next(error)
    }
  }

}
