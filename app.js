import express from 'express'; 
import morgan from 'morgan'; 
import cors from 'cors'; 
import path from 'path';
import bcrypt from 'bcrypt'; //m


const app = express()


//Conectando con la base de datos
const mongoose = require('mongoose');

const uri = 'mongodb+srv://vue-user:1234567890_Mintic@vue-base.bv1sc.mongodb.net/vue-base?retryWrites=true&w=majority';
const options = { useNewUrlParser: true, useUnifiedTopology: true };

mongoose.connect(uri, options).then(
  () => { console.log('Conectado a DB') },
  err => { console.log(err) }
)


//middleware
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use(express.urlencoded({ extended: true }))

// app.use('/api', require('./routes/VehiculosRoutes'));
// app.use('/api/entrada_vehiculo', require('./routes/EntradaVehiclesRoutes'));
// middlewares apra VUE

// app.use('/api', require('./routes/list_Info_parq_Routes'));
// app.use('/api', require('./routes/info_parqPrueba'))
app.use('/api/entrada_vehiculo', require('./routes/EntradaVehiclesRoutes'))
app.use('/api/', require('./routes/Resident_inf'))
app.use('/api/', require('./routes/HogaresRoutes'))

// app.use('/api', require('./routes/Info_parq_Routes'));
app.use('/api/authentication', require("./routes/authentication/login"));

const history = require('connect-history-api-fallback'); 

app.use(history()); 
app.use(express.static(path.join(__dirname, 'public')));


//Puerto
app.set('puerto', process.env.PORT || 3000); 
app.listen(app.get('puerto'), function () { console.log('Example app listening on port '+ app.get('puerto')); });
