import Parking from '../models/parking'
import Home from '../models/hogar'
module.exports = {
  AssignParkingToHome: async (req, res, next) => {
    const {
      IdParking,
      idHome

    } = req.body
    try {
      const BringHome = await Hogar.findById({
        idHome
      })
      const updateParking = await Parqueadero.findOneAndUpdate({ _id: IdParking }, { home: idHome, assigned: true }, { new: true })

      BringHome.parqueadero = updateParking._id
      await BringHome.save()

      res.status(201).json(updateParking)
    } catch (error) {
      return next(error)
    }
  },
  fillParking: async (req, res, next) => {
    const {
      id,
      entryTime
    } = req.body
    try {
      const ParkingFill = await Parqueadero.findOneAndUpdate(
        { _id: id },
        { lastEntryTime: entryTime, lastExitTime: null, isTaken: true },
        { new: true }
      )

      res.status(200).json(ParkingFill)
    } catch (error) {
      return next(error)
    }
  }

}
