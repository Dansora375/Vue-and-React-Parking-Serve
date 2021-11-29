import Home from '../models/home'

import Owner from '../models/owner'

module.exports = {

  newHome: async (req, res, next) => {
    const NeighborhoodId = req.params.IdNeighborhood
    const {
      name,
      IdGroup

    } = req.body
    try {
      const home = new Home({
        name,
        group: IdGroup,
        neighborhood: NeighborhoodId
      })
      const saveHome = await home.save()
      res.status(200).json(saveHome)
    } catch (error) {
      return next(error)
    }
  },
  HomesByGroup: async (req, res, next) => {
    // Nose necesitara darle el nieghborhood ya que
    // los groups del select estaran filtradas  ya por eun
    // neighborhoood determinado
    const idGroup = req.params.GroupId
    try {
      const homes = await Home.find({ group: idGroup }, 'name group')
      res.status(200).json(homes)
    } catch (error) {
      return next(error)
    }
  },

  HomeMoreInfo: async (req, res, next) => {
    const idHome = req.params.HomeId
    const populateGroup = {
      path: 'group',
      select: 'name homeType'
    }

    const populateOwner = {
      path: 'owner',
      select: 'name telephone'
    }
    try {
      const home = await Home.findById({ _id: idHome }, 'name group owner')
        .populate(populateGroup)
        .populate(populateOwner)
      res.status(200).json(home)
    } catch (error) {
      return next(error)
    }
  },

  VehicleAndParking: async (req, res, next) => {
    const idHome = req.params.HomeId
    const VehicleParking = {
      path: 'parking',
      populate: {
        path: 'vehicle',
        select: 'plate carBrand type color extra'
      },
      select: 'name'

    }
    try {
      const home = await Home.findById({ _id: idHome }, 'parking')
        .populate(VehicleParking)
      res.status(200).json(home)
    } catch (error) {
      return next(error)
    }
  },

  modifyOwner: async (req, res, next) => {
    const OwnerId = req.params.OwnerId
    const {
      name,
      identification,
      telephone

    } = req.body
    try {
      await Owner.findByIdAndUpdate(
        {_id: OwnerId },
        { name, identification, telephone }, { new: true }
      )
      res.status(200)
    } catch (error) {
      return next(error)
    }
  },
  // AGREGAR LOS POPULATED DE ACUERDO A LOS DATOS NECESARIOS AL
  // CREAR EL INGRESO DEL RESIDENTE
  homeWithParking: async (req, res, next) => {
    const NeighborhoodId = req.params.IdNeighborhood
    const data = []
    const populateParking = {
      path: 'parking',
      select: 'isTaken'
    }
    try {
      const homeWhitParking = await Home.find({ neighborhood: NeighborhoodId })
        .populate(populateParking)

      homeWhitParking.forEach(ele => {
        if (ele.parking.isTaken === false && ele.group && ele.owner) {
          data.push(ele)
        }
      })
      res.json(data)
    } catch (error) {
      return next(error)
    }
  },
  // Probar SI FUNCIONA CON EL MAP
  homeWithGroup: async (req, res, next) => {
    const NeighborhoodId = req.params.IdNeighborhood
    try {
      const homeWhitGroup = await Home.find({ neighborhood: NeighborhoodId })
      const data = []
      const dataMap = homeWhitGroup.map(ele => {
        if (ele.Group && (ele.owner === undefined || ele.owner === null)) {
          data.push(ele)
        }
        return data
      })
      res.json(dataMap)
    } catch (error) {
      return next(error)
    }
  },

  /**
   * Cambios hechos por Cristian Ramirez
   */
  VehicleAndParking2: async (req, res, next) => {
    const idHome = req.params.HomeId
    // console.log("los requerimientos son: ", req)
    // console.log(idHome)
    const VehicleParking = {
      path: 'parking',
      populate: {
        path: 'vehicle',
        select: 'plate carBrand type color extra'
      },
      select: 'name'

    }
    // const xd = ObjectId(idHome)

    try {
      const home = await Home.findById({ _id: idHome }, 'parking')
        .populate(VehicleParking)
      req.home = home
      return next()
    } catch (error) {
      return next(error)
    }
  }
}
