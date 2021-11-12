
const express = require('express')
const router = express.Router()
const controller = require('../controllers/Neighbor.H.Ctrller')

router.post('/', controller.newNeighborhood)
router.get('/', controller.Neighborhoods)
router.put('/', controller.updateNeighborhood)
router.delete('/', controller.deleteNeighborhood)
