import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import path from 'path'
import User from './models/user'
import notFound from './middleware/notFound'
import handleErros from './middleware/handleErros'
// import bcrypt from 'bcrypt' //

// Requiriendo dotenv para ver si existe archivo .env y leerlo
require('dotenv').config()

const app = express()
// Routes
const ParkingRoute = require('./routes/Parking')
const HomeRoute = require('./routes/Home')
const OwnerRoute = require('./routes/Owner')
const NeighborhoodRoute = require('./routes/Neighborhood')
const GroupRoute = require('./routes/Group')
const VehicleRoute = require('./routes/Vehicle')
// Conectando con la base de datos
const mongoose = require('mongoose')

const uri = process.env.MONGO_DB_URI
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
  // useCreateIndex: true
}

// middlewares
app.use(morgan('tiny'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(setUser)

app.use('/api/Neighborhood', NeighborhoodRoute)
app.use('/api/Parking', ParkingRoute)
app.use('/api/Home', HomeRoute)
app.use('/api/Owner', OwnerRoute)
app.use('/api/Group', GroupRoute)
app.use('/api/Vehicle', VehicleRoute)
// middlewares para captura de errores
app.use(notFound)
app.use(handleErros)

const history = require('connect-history-api-fallback')

app.use(history())
app.use(express.static(path.join(__dirname, 'public')))

//
function setUser (req, res, next) {
  const userId = req.body.userId
  if (userId) {
    req.user = User.findById(userId)
  }
  next()
}

// Puerto
app.set('puerto', process.env.PORT)

// para iniciar el servidor, es importante que se encuentre disponible la conección a la base de datos
const serverConnection = async () => {
  try {
    // conectando la base de datos
    await mongoose.connect(uri, options)
    console.log('Conectado a DB')

    // encendiendo el servidor
    await app.listen(app.get('puerto'), function () {
      console.log('Example app listening on port ' + app.get('puerto'))
    })
  } catch (error) {
    console.error(`No se pudo encender el servidor : ${error}`)
  }
}

serverConnection()
// Buena practica probar que sucede xd
process.on('uncaughtException', () => {
  mongoose.connection.disconnect()
})
