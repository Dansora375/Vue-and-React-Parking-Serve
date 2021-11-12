const express = require('express')
const router = express.Router()
const controller = require('../controllers/OwnerController')

// obtiene los datos de residentes sin ningun filtro
// probablemente para el get en la vista residentes
router.get('/:IdNeighborhood', controller.Owners)

// get para modal mas inf en vista residentes
router.get('/MoreInfo/:IdOwner', controller.OwnerMoreInfo)

// crear nuevo owner, se necesitara decir cual es su
// home seleccionandolo de un select
router.post('/:IdNeighborhood', controller.newOwner)

// edicion de los datos unicamente del owner, no incluye los de
// su hogar parqueadero o vehiculo
router.put('/:IdOwner', controller.editOwner)

router.delete('/:IdOwner', controller.deleteOwner)

// Se puede implementar posteriormente una ruta para asignarle a un
// owner mas de un hogar , por lo que se deberia realizar su respectivo modal
// el cual tendria un select con hogares que no tenga owner asignado

// Recordar tambien agregar ruta en una futua implementacion para filtrar al usar la lupa

// ------------------------------------------
// PARA OBTENER LA LISTA DE RESIDENTES PARA LA VISTA DE INGRESO DE VEHICULOS, en la que se busca filtrar por aquellos que tengan parqueadero.
// Es una opcion a usar en vez del select con los hogares
router.get('/Select/:IdNeighborhood', controller.OnwerWhitParking)

module.exports = router
