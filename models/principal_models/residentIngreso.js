import mongoose from 'mongoose'
const Schema = mongoose.Schema

const ResidenteEntrada = new mongoose.Schema({

  // Traera datos del residente segun el cc que se indique
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

  hora_entrada: {
    type: Date,
    default: Date.now
  },

  hora_salida: Date

})

const IngresoResident = mongoose.model('IngresoResident', ResidenteEntrada)
export default IngresoResident
