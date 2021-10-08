import express from 'express'

import NewVisitor from '../../Por_si_algo/list_info_parq'
const router = express.Router()

router.post('/vehicle_zone', async (req, res) => {
  const body = req.body
  try {
    const Inf_ParkDB = await NewVisitor.create(body)
    res.status(201).json(Inf_ParkDB)
  } catch (error) {
    return res.status(500).json({ mensaje: `Ocurrio un error', ${error}`, error })
  }
})

router.get('/vehicle_zone', async (req, res) => {
  try {
    const Inf_ParkDB = await NewVisitor.find()
    res.status(200).json(Inf_ParkDB)
  } catch (error) {
    return res.status(400).json({
      mensaje: `Ocurrio un error', ${error}`, error
    })
  }
})

module.exports = router
