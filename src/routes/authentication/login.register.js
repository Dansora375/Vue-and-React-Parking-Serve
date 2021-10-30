import express from 'express';
import jwt from 'jsonwebtoken';
import { SECRET, DURATION_TOKEN } from '../../configuration/config';
import { setUser } from '../../middleWares/auth/auth' 

import User from '../../models/user';
const router = express.Router();


// ruta para creacion de usuario nuevo
router.post('/register', async (req, res) => {
  const {
    username,
    password,
    rol,
    email,
    identification,
    name,
    neighborhood
  } = req.body;

  
  try {
    const user = new User({
      username,
      password,
      rol,
      email,
      identification,
      name,
      neighborhood
    });
    console.log(user)
    await user.save()

    // creando el token a partir del usuario
    const token = jwt.sign({id: user._id}, SECRET, {
      expiresIn: DURATION_TOKEN // definiendo la duracion del token
    })
    //eliminando la contraseña del usuario para poder enviar los datos al cliente
    user.password = undefined
    res.status(200)
    res.json({token, user})
  } catch (error) {
    res.status(400)
    res.send({'error': `Error creando el usuario ${error}`})
  } 
})

router.post('/login', setUser,async (req, res) => {
  res.send({ userData: req.userData, token: req.token, auth: true}  )
})

module.exports = router;