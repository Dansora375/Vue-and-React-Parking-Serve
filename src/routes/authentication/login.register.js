import express from 'express'
import { setUser } from '../../middleWares/auth/auth'

import authController from '../../controllers/authenticationController'

const router = express.Router()

// ruta para creacion de usuario nuevo
router.post('/signup', authController.register)

router.post('/signin', setUser, authController.login)

// router.post('/token', setUser, async (req, res) => {
//   res.status(200)
//   res.send({ token: req.token })
// })

// router.get('/prueba', async (req, res) => {
//   res.send('hola mundo')
// })

// router.get('test', async (req, res) => {
//   const token = req.headers['x-access-token']
//   if (!token) {
//     res.status(401)
//     res.send({ auth: false, message: 'no Token provided' })
//   } else {
//     await jwt.verify(token, SECRET, function (error, decoded) {
//       if (error) {
//         res.status(400)
//         res.send({ permission: false, message: `${error}` })
//       } else {
//         res.status(200)
//         res.send({ permission: true, message: `${decoded}` })
//       }
//     })
//     // res.send('holamundo')
//   }
// })

module.exports = router
