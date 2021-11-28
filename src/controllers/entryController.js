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
    console.log('etsoy aqui')
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
          req.result = result
          res.json(result)
        } else {
          req.notResultMessage = 'It couldnt be completed the task, please try again or contact to support'
        }
      })
      // console.log(home, entryResident)
    } catch (error) {
      next(error)
    }
  }

}
