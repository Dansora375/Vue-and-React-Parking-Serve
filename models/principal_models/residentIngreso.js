import mongoose from 'mongoose'
const Schema = mongoose.Schema
const opts = {
  // Make Mongoose use Unix time (seconds since Jan 1, 1970)
  timestamps: { currentTime: () => Math.floor(Date.now() / 1000) }
}
const ResidenteEntrada = new mongoose.Schema({

  // Traera datos del residente segun el CC que se indique al realizar el post de un nuevo ingreso de residente
  residente: {

    type: Schema.Types.ObjectId,
    ref: 'Residente'
  },

  activo: {
    type: Boolean,
    default: true
  },
  ocupado: {
    type: Boolean,
    default: true
  },
  // En cuanto se cree un nuevo ingreso de residente,
  // la fecha de entada sera establecida
  hora_entrada: {
    type: Date,
    default: Date.now
  },

  hora_salida: Date

},
{ timestamps: true },
opts
)

const IngresoResident = mongoose.model('IngresoResident', ResidenteEntrada)
export default IngresoResident
