import Group from '../models/group'

module.exports = {
  newGroup: async (req, res, next) => {
    const IdNeighborhood = req.params.IdNeighborhood
    const {
      name,
      capacity,
      homeType
    } = req.body

    try {
      const newGroup = new Group({
        name,
        capacity,
        homeType,
        neighborhood: IdNeighborhood
      })
      const savedGroup = await newGroup.save()

      res.status(200).json(savedGroup)
    } catch (error) {
      return next(error)
    }
  },

  GroupsToSelect: async (req, res, next) => {
    const IdNeighborhood = req.params.IdNeighborhood
    try {
      const Groups = await Group.find({ neighborhood: IdNeighborhood })
      res.status(200).json(Groups)
    } catch (error) {
      return next(error)
    }
  }

}
