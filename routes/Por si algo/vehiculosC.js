import express from 'express';
const router = express.Router();

//importando el modelo vehiculo
import Vehiculo from '../models/vehiculos';

router.post('/nuevo-vehiculo', async(req, res)=>{
  const body = req.body;
  try{
    const notaDB = await Vehiculo.create(body);
    res.status(200).json(notaDB);
  }catch(error){
    return res.status(500).json({
      mensaje: `${error}`,
      error
    })
  }
});

module.exports = router;