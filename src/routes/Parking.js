
const express = require('express')
const router = express.Router()
const controller = require('../controllers/ParkingController')

// Se utilizara para asignar un parqueadero a un hogar
router.put('/Assign/Home/:HomeId', controller.AssignParkingToHome)

// get para poder enlistar los parqueaderos en los select de los hogares, al querer aignar un parqueadero a un hogar
// estos estaran filtrados por aquellos que tengan como dato
// "Assingned:false" y que el "personType:Residente"
router.get('/Assign/Home/:IdNeighborhood', controller.ParkingAssigneedFalse)

// Esta se utilizara cuando se CREE un ingreso o en
// llenar parqueadero
// router.put('/Entry/Resident', controller.fillParkingResi)

// aquellos que tengan el dato "isTaken :false "
// POR AHORA NO SE UTILIZA, POSIBLE IMPLEMENTACION FUTURA
router.get('/Entry/Resident', controller.ParkingIsTakenResi)

// Get para obtener los parqueaderos que se usaran en los
// select de los ingresos de vehiculos PARA VISITANTES; se filtraran por
// aquellos que tengan el dato "isTaken :false y sean "personType:visitant"
router.get('/Entry/Visitant/:IdNeighborhood', controller.ParkingIsTakenVisitant)

// Esta se utilizara cuando se de en terminar un ingreso o en
// vaciar parqueadero junto con la ruta para put del ingreso
// de residente
router.put('/Exit/Residen/:IdParking', controller.emptyParkingResi)

// Este post se realizara en primera instancia para crear parqueaderos sin relacion alguna
router.post('/:IdNeighborhood', controller.newParking)

// get para obtener parqueaderos sin ningun tipo de filtro,
// claramente tiene el filtro del neighborhood correspondiente
router.get('/:IdNeighborhood', controller.Parkings)

// get para obtener parqueaderos para la vista ed parqueaderos
// que sean de tipo:Residente
router.get('/Resident/:IdNeighborhood', controller.residentsParkings)

// get para obtener parqueaderos para la vista ed parqueaderos
// que sean de tipo:Visitante
router.get('/Visitant/:IdNeighborhood', controller.visitantsParkings)

// get para obtener la info para modal mas inf
// que sean de tipo:Residente
router.get('/Resident/MoreInfo/:IdNeighborhood', controller.residentsParkingsMoreInf)

// get para obtener la info para los modal mas info
// que sean de tipo:Visitante
router.get('/Visitant/MoreInfo/:IdNeighborhood', controller.visitantsParkingsMoreInf)

// get para el select de la vista de vehiculos
// se mostraran parqueaderos sin vehiculo
router.get('/Vehicles/:IdNeighborhood', controller.parkingsWithoutVehicle)

module.exports = router
