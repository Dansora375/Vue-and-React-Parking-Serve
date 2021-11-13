const express = require('express')
const router = express.Router()
const controller = require('../controllers/VehicleController')

// Nuevo residente
router.post('/:IdNeighborhood', controller.newVehicle)

// Obtener todos lo vehiculos para la vista
router.get('/:IdNeighborhood', controller.Vehicles)

// Obtener todos lo vehiculos para el modal mas info
router.get('/MoreInfo/:IdVehicle', controller.vehiclesMoreInfo)

// Para editar unicamente la informacion del vehiculo,
// sin cambiarle el parqueadero al que pertence y por tanto,
// tampoco el owner
router.put('/:IdVehicle', controller.vehiclesMoreInfo)

// eliminar vehiculo
router.delete('/:IdVehicle', controller.deleteVehicle)
module.exports = router
