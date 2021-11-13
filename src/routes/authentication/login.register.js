import express from 'express';
import jwt from 'jsonwebtoken';
import { SECRET, DURATION_TOKEN } from '../../configuration/config';
import { setUser } from '../../middleWares/auth/auth' 

import User from '../../models/user';
const router = express.Router();


// ruta para creacion de usuario nuevo
router.post('/signup', async (req, res) => {
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
    await User.exists({ username }, async (error, result) => {
      if(error){
        res.status(400)
        res.send({auth: false, message: `${error}`})
      }else {
        if(result){
          res.status(403)
          res.send({ auth: false, message: 'el nombre de usuario ya esta asignado', isAssigned: true})
        } else {
          // el usuario no existe por lo que se puede continuar con el resto de la funcion
          const user = new User({
            username,
            password,
            rol,
            email,
            identification,
            name,
            neighborhood
          });
          
          // validando que el usuario no exista
      
          // console.log(user)
          await user.save()
      
          // creando el token a partir del usuario
          const token = jwt.sign({id: user._id}, SECRET, {
            expiresIn: DURATION_TOKEN // definiendo la duracion del token
          })
          //eliminando la contraseña del usuario para poder enviar los datos al cliente
          user.password = undefined
          user._id = undefined
          res.status(200)
          res.json({token, user})
        }
      }
    })
    
  } catch (error) {
    res.status(400)
    res.send({'error': `Error creando el usuario ${error}`})
  } 
})

router.post('/signin', setUser,async (req, res) => {
  res.send({ userData: req.userData, token: req.token, auth: true})
})


router.post('/token', setUser,async (req, res) => {
  res.status(200)
  res.send({ token: req.token })
})

router.get('/prueba', async (req, res) => {
  res.send('hola mundo')
})

router.get('test', async (req, res) => {
  const token = req.headers['x-access-token'];
  if(!token) {
    res.status(401)
    res.send({auth: false, message: 'no Token provided'})
  }else{
    await jwt.verify(token, SECRET, function (error, decoded){
      if(error){
        res.status(400)
        res.send({ permission: false, message: `${error}`})
      }else{
        res.status(200)
        res.send({ permission: true, message: `${decoded}`})
      }
    })
    // res.send('holamundo')
  }

  
})

module.exports = router;