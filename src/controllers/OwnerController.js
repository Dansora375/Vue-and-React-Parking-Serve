import Owner from '../models/owner'
import Home from '../models/home'
const { ObjectId } = require('mongodb')

module.exports = {

  OwnerWhitParking: async (req, res, next) => {
    const data = []
    const IdNeighborhood = req.params.IdNeighborhood
    try {
      const OwnerWhitParking = await Owner.find({ neighborhood: IdNeighborhood }, 'name home')
      OwnerWhitParking.forEach(ele => {
        const anyParking = ele.home.some(item => item.parking)
        if (anyParking) {
          data.push(ele)
        }
      })
      res.status(200).json(data)
    } catch (error) {
      return next(error)
    }
  },

  Owners: async (req, res, next) => {
    const IdNeighborhood = req.params.IdNeighborhood

    try {
      const Owners = await Owner.find({ neighborhood: IdNeighborhood }, 'name identification')

      res.status(200).json(Owners)
    } catch (error) {
      return next(error)
    }
  },

  OwnerMoreInfo: async (req, res, next) => {
    const IdOwner = req.params.IdOwner

    const VehicleParking = {
      path: 'home',
      populate: {
        path: 'Parking',
        populate: {
          path: 'vehicle',
          select: 'plate carBrand type color extra'
        },
        select: 'name'
      }
    }
    const groupHome = {
      path: 'home',
      populate: {
        path: 'group',
        select: 'name'
      },
      select: 'name'
    }

    try {
      // no es necesario pasarle el neigborhood ya que
      // anteriormente en el get de owner ya se filtra
      const owner = await Owner.findById({ _id: IdOwner }, 'name identification telephone home')
        .populate(VehicleParking)
        .populate(groupHome)

      // de ser necesarios mas datos o edep populates se poeden añadir
      res.status(200).json(owner)
    } catch (error) {
      return next(error)
    }
  },

  newOwner: async (req, res, next) => {
    const IdNeighborhood = req.params.IdNeighborhood

    const {
      name,
      identification,
      telephone,
      homeId
    } = req.body

    try {
      const newOwner = new Owner({
        name,
        identification,
        telephone,
        neighborhood: IdNeighborhood
        // home: homeId
      })
      newOwner.home = newOwner.home.concat(homeId)

      const savedOwner = await newOwner.save()

      const bringHome = await Home.findById({ _id: homeId })
      bringHome.owner = savedOwner._id
      await bringHome.save()

      res.status(200).json(savedOwner)
    } catch (error) {
      return next(error)
    }
  },
  editOwner: async (req, res, next) => {
    const ownerId = req.params.IdOwner
    const {

      name,
      identification,
      telephone

    } = req.body

    try {
      const ownerToEdit = await Owner.findByIdAndUpdate({ _id: ownerId }, { name, identification, telephone }, { new: true })

      res.status(200).json(ownerToEdit)
    } catch (error) {
      return next(error)
    }
  },

  deleteOwner: async (req, res, next) => {
    const IdOwner = req.params.IdOwner

    try {
      await Owner.findByIdAndDelete({ _id: IdOwner })
      res.status(200)
    } catch (error) {
      return next(error)
    }
  }

}
