import mongoose from 'mongoose'
const Schema = mongoose.Schema

// Esquema
const Sch_Info_parqueadero = new Schema({
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

  state_options: {
    type: Boolean,
    default: false

  },

  state_model_inf_p: {
    type: Boolean,
    default: false

  },

  state_model_Ing_V_vis: {
    type: Boolean,
    default: false

  },
  state_model_vaciar_P: {
    type: Boolean,
    default: false

  },
  state_model_llenar_P: {
    type: Boolean,
    default: false

  },

  date: {
    type: Date,
    default: Date.now
  }

})

// Modelo
const Info_parqueadero = mongoose.model('Info_parqueadero ', Sch_Info_parqueadero)
export default Info_parqueadero
