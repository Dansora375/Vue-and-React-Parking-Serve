import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import path from 'path'

const app = express()

// ----------------------------------------------------------------------
// Conexion
const mongoose = require('mongoose')
// const password = '1234567890_Mintic'
// const userName = 'vue-user'
// const dbname = "Prueba_D"

// const uri = `mongodb+srv://${userName}:${password}@vue-base.bv1sc.mongodb.net/${dbname}?retryWrites=true&w=majority`
// const uri = 'mongodb+srv://vue-user:1234567890_Mintic@vue-base.bv1sc.mongodb.net/vue-base?retryWrites=true&w=majority';
const uri = 'mongodb+srv://vue-user:1234567890_Mintic@vue-base.bv1sc.mongodb.net/vue-base?retryWrites=true&w=majority'
const options = { useNewUrlParser: true, useUnifiedTopology: true }

mongoose.connect(uri, options).then(
  () => { console.log('Conectado a DB') },
  err => { console.log(err) }
)

// --------------------------------------------------
// mi projecto 0

// UsuarioAd
// iB6yVFTLZlPIri68

// para: daniel_prueba
// UHuQSrtrbYhyZx4X

// prueba_2
// Yu8nf1SGoIFlTj3v

// const mongoose = require('mongoose');

// const password = 'Yu8nf1SGoIFlTj3v'
// const userName = 'prueba_2'
// const dbname = "Prueba_DanielM"

// // const { MongoClient } = require('mongodb');

// const uri = `mongodb+srv://${userName}:${password}@vueparking.rbylx.mongodb.net/${dbname}?retryWrites=true&w=majority`;
// const options ={ useNewUrlParser: true, useUnifiedTopology: true };
// // const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// mongoose.connect(uri, options).then(
//     () => { console.log('Conectado a DB') },
//     err => { console.log(err) }
// );

// --------------------------------------------------

// middlewares
app.use(morgan('tiny'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// application/x-www-form-urlencoded

// app.use(express.static(path.join(__dirname, 'public')));

// -------------------------------------------------------------
// Ruta

// app.get('/', function (req, res) {
//     res.send('Hello World!');
// });

// ---------------------------------------------------------------
// middlewares apra VUE

// app.use('/api', require('./routes/list_Info_parq_Routes'));
// app.use('/api', require('./routes/info_parqPrueba'))
app.use('/api/entrada_vehiculo', require('./routes/EntradaVehiclesRoutes'))
app.use('/api/', require('./routes/Resident_inf'))
// app.use('/api/', require('./routes/HogaresRoutes'))

const history = require('connect-history-api-fallback')
app.use(history())
app.use(express.static(path.join(__dirname, 'public')))

// Puerto
app.set('puerto', process.env.PORT || 3000)
app.listen(app.get('puerto'), function () { console.log('Example app listening on port' + app.get('puerto')) })
