const express = require('express')
const router = express.Router()
const controller = require('../controllers/GroupController')

// Crear nuevo grupo ya se a de torres o casas
router.post('/:IdNeighborhood', controller.newGroup)

// para utilizar en el select de la vista de hogares
router.get('/:IdNeighborhood', controller.GroupsToSelect)
