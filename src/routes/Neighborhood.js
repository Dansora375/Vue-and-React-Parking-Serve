
const express = require('express')
const router = express.Router()
const controller = require('../controllers/Neighbor.H.Ctrller')

router.post('/', controller.newNeighborhood)
router.get('/', controller.Neighborhood)
router.get('/list ', controller.neighborhoods)
router.put('/', controller.updateNeighborhood)
router.delete('/', controller.deleteNeighborhood)
module.exports = router
