import express from 'express'

import entryController from '../controllers/entryController'

// 'VehicleAndParking2' trae los datos del parqueadero y del vehiculo dado el id de una casa
import { VehicleAndParking2 } from '../controllers/HomeController'
// 'fillParkingResi' se encarga de llenar el parqueadero dado un id
import { fillParkingResi, fillParkingVisi } from '../controllers/ParkingController'

const router = express.Router()

/** para postear una nueva entrada de residente se necesitan los siguientes datos:
 * params: IdNeighborhood, HomeId
 * body: entryTime (opcional ya que en el moedlo esta por default)
**/
router.post('/new-entry-resident/:IdNeighborhood/:HomeId', VehicleAndParking2, entryController.newEntryResident, fillParkingResi, (req, res) => {
  // los middleware anteriores se encargan de consultar y hacer toda la logica de negocio
  // aqui solo se valida que tipo de dato llego
  const wasFilled = req.wasFilled
  const parkingResult = req.resultParkingUpdate
  if (req.notResultMessage || !wasFilled) {
    res.status(400)
    res.send({ message: req.notResultMessage })
  } else {
    res.status(200)
    res.send({ data: req.result, message: 'The task was completed succesfully', resultParking: parkingResult })
  }
})

/**
 *
 */
router.post('/new-entry-visitant/:IdNeighborhood/:ParkingId', entryController.newEntryVisitant, fillParkingVisi, (req, res) => {
  // los middleware anteriores se encargan de consultar y hacer toda la logica de negocio
  // aqui solo se valida que tipo de dato llego
  const wasFilled = req.wasFilled
  if (req.notResultMessage || !wasFilled) {
    res.status(400)
    res.send({ message: req.notResultMessage })
  } else {
    res.status(200)
    res.send({ data: req.result, message: 'The task was completed succesfully' })
  }
})

router.get('/list-entry-resident/:IdNeighborhood', entryController.listEntryResident, (req, res) => {
  res.status(200)
  res.send({
    list: req.listEntryR,
    taskComplete: true
  })
})

router.get('/list-entry-visitant/:IdNeighborhood', entryController.listEntryVisitants, (req, res) => {
  res.status(200)
  res.send({
    list: req.listEntryV,
    taskComplete: true
  })
})
router.get('/more-info-entry-resident/:idEntryResi', entryController.MoreInfoEntryResident, (req, res) => {
  res.status(200)
  res.send({
    data: req.entryResi,
    taskComplete: true
  })
})

router.get('/more-info-entry-visitant/:idEntryVisi', entryController.MoreInfoVisitants, (req, res) => {
  res.status(200)
  res.send({
    data: req.entryVisi,
    taskComplete: true
  })
})

module.exports = router
