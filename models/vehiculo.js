import mongoose from 'mongoose'

const Schema = mongoose.Schema
const opts = {
  // Make Mongoose use Unix time (seconds since Jan 1, 1970)
  timestamps: { currentTime: () => Math.floor(Date.now() / 1000) }
}
const vehiculoSche = new mongoose.Schema({

  placa: {
    type: String,
    required: [true, 'Placa es obligatoria']
  },
  marca: String,
  color: String,
  tipo: {
    type: String,
    enum: ['Carro', 'Moto', 'Ninguno'],
    default: ['Carro', 'Moto', 'Ninguno'].lastItem
  },
  datos_extra: String,
  // Al crear eL vehiculo si se le ingresa el nombre del parqueadero se relacionara , no es obligatoria ya que residentes pueden tener vehiculos sin parqueadero
  parqueadero: {
    type: Schema.Types.ObjectId,
    ref: 'parqueadero'
  },
  // Se debera ingresar el CC del dueño del auto
  ResidentOwner: {
    type: Schema.Types.ObjectId,
    ref: 'Residente'
  },
  haveParq: {
    type: Boolean,
    default: false
  }

},
{ timestamps: true },
opts
)

const vehiculo = mongoose.model('vehiculo', vehiculoSche)
export default vehiculo
