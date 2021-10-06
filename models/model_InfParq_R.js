import mongoose from 'mongoose'
const Schema = mongoose.Schema

// Esquema
const inf_parq_R = new Schema({
  residente: {

    resi_name: {
      type: String,
      required: [true, 'Nombre obligatorio']
    },
    cc: {
      type: Number,
      required: [true, 'CC obligatorio']
    },
    tel: Number
  },

  apartamento: {

    apto_num: {
      type: Number,
      required: [true, 'numero de apartamento obligatorio']
    },
    tower: String
  },

  vehiculo: {

    vehicle_type: String,
    marca: String,
    placa: String,
    color: String

  },

  ocupado: {
    type: Boolean,
    default: false
  },

  vehicle_state: {
    type: String,
    default: 'Ninguno'
  },

  date: {
    type: Date,
    default: Date.now
  }

})

// Modelo
const Mdl_infPar_R = mongoose.model('Mdl_infPar_R ', inf_parq_R)
export default Mdl_infPar_R
