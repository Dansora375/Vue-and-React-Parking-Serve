import express from "express";
const router = express.Router();

import Info_parqueadero from "../models/info_parqueadero";

router.post('/vehicle_zone', async (req, res) => {
    const body = req.body;
    try {
        const Inf_ParkDB = await Info_parqueadero.create(body);
        res.status(201).json(Inf_ParkDB); 
    }catch (error) { 
        return res.status(500).json({ 
        mensaje: `Ocurrio un error', ${error}`, error })    
    }

})


router.get('/vehicle_zone', async (req, res) => {
    try {
        const Inf_ParkDB = await Info_parqueadero.find();
        res.status(200).json(Inf_ParkDB);
    } catch (error) {
        return res.status(400).json({ 
            mensaje: `Ocurrio un error', ${error}`, error 
        }) 
        
    }

}) 



module.exports = router;