import mongoose from 'mongoose'

const Schema = mongoose.Schema
// const options_type = ['Carro', 'Moto', 'Ninguno']
// Creando el Schema
const opts = {
  // Make Mongoose use Unix time (seconds since Jan 1, 1970)
  timestamps: { currentTime: () => Math.floor(Date.now() / 1000) }
}

const residenteSchema = new mongoose.Schema({
  // Datos de persona
  nombre: {
    type: String,
    required: [true, 'Nombre obligatorio']
  },
  cedula: {
    type: Number,
    required: [true, 'CC obligatorio']
  },
  telefono: Number,

  // Datos sobre residencia
  // Un residente puede tener varios hogares, no es lo optino
  // Este array de hogares se llenara desde post de los hogares
  hogar: [{
    type: Schema.Types.ObjectId,
    ref: 'Hogar'
  }],
  // Se ira llenando con el id del hogar correspondiente si el  residente no es el porpietario,y tambien si se ha ingresado el apto_num y el tower
  hogar_habitando: {
    type: Schema.Types.ObjectId,
    ref: 'Hogar'
  },
  // En el vehiculo vendran los datos del parqueadero y del propio vehiculo
  // Desde el post del vehiculo se enviara el id del vehiculo y los datos de este
  vehiculo: [{
    type: Schema.Types.ObjectId,
    ref: 'vehiculo'
  }]

},
{ timestamps: true },
opts
)

// Creando el modelo

const Residente = mongoose.model('Residente', residenteSchema)

export default Residente
