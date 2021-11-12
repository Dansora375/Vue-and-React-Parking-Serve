const express = require('express')
const router = express.Router()
const controller = require('../controllers/HomeController')

// se necesita el id del grupo al que pertenece
router.post('/:IdNeighborhood', controller.newHome)

// Ruta para modificar el owner de un hogar
// Solo se podran modificar los datos del owner del hogar
// los datos dEl owner que pertenecia a ese home dejara de existir
// agregar esta advertencia en la vista
router.put('/Modify/Owner/:OwnerId  ', controller.modifyOwner)

// Para obetener los hogares filtrandose por su torre,
// utilizada en la vista hogares cuando se seleccione una
// opcion en el select de gorups
router.get('/Group/:GroupId', controller.HomesByGroup)

// utilizada en la vista hogares al darle en MAS INFORMACION
router.get('/MoreInfo/:HomeId', controller.HomeMoreInfo)

// utilizada en la vista hogares dentro del modal MAS INFORMACION
// al darle en el boton vehiculos y parqueaderos
router.get('/Inf/Parking/:HomeId', controller.VehicleAndParking)

// obtener los hogares con parquederos, owner y group, se utilizara en
// los select al crear un nuevo ingreso de residente
// El parqueadero del  hogar debera tener el dato
// "isTaken = fasle" para que se muestre
router.get('/Select/Entry/Resident/:IdNeighborhood', controller.homeWithParking)

// obtener los hogares con group, se utilizara en
// los select al crear un nuevo owner,
// Se mostraran solo los hogares que no tengan asignado ya
// un owner
router.get('/Select/New/Owner/:IdNeighborhood', controller.homeWithGroup)

// FALTA ESTABLECER LA FORMA COMO SE HARA LA ASIGNACION DE PARUQEADERO Y HOGAR , para asi realizar la ruta

module.exports = router
