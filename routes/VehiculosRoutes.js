import express from 'express'

// importando el modelo vehiculo
import Vehiculo from '../models/vehiculos'
const router = express.Router()

router.post('/nuevo-vehiculo', async (req, res) => {
  const body = req.body
  try {
    const notaDB = await Vehiculo.create(body)
    const vehiculo = await Vehiculo.findById(
      notaDB.id
    )
    res.status(200).json(vehiculo)
  } catch (error) {
    return res.status(500).json({
      mensaje: `${error}`,
      error
    })
  }
})

module.exports = router
