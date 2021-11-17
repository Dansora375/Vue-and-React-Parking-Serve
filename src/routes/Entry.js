import express from 'express'

import entryController from '../controllers/entryController'

// 'VehicleAndParking2' trae los datos del parqueadero y del vehiculo dado el id de una casa
import { VehicleAndParking2 } from '../controllers/HomeController'


const router = express.Router()


router.get('/new-entry-resident', VehicleAndParking2, entryController.newEntryResident, (req, res) =>{
  // los middleware anteriores se encargan de consultar y hacer toda la logica de negocio
  // aqui solo se valida que tipo de dato llego
  if(req.notResultMessage){
    res.status(400)
    res.send({message: req.notResultMessage})
  }else {
    res.status(200)
    res.send({ data: req.result, message: "The task was completed succesfully"})
  }
})

module.exports = router