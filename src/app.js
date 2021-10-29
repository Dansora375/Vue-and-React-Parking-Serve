import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import path from 'path'
import { DATA_BASE, USER, PASSWORD } from './config/db'
// import User from './models/user';
// import bcrypt from 'bcrypt' //

const app = express()

// Conectando con la base de datos
const mongoose = require('mongoose')

const uri = `mongodb+srv://${USER}:${PASSWORD}@vue-base.bv1sc.mongodb.net/vue-base?retryWrites=true&w=majority`
const options = { useNewUrlParser: true, useUnifiedTopology: true }

// middlewares
app.use(morgan('tiny'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(setUser)

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
app.set('puerto', process.env.PORT || 3000)

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
