import mongoose from 'mongoose'
const Schema = mongoose.Schema

const list_Info_parq_Sch = new Schema({

  apartamento: {

    apto_num: {
      type: Number,
      required: [true, 'numero de apartamento obligatorio']
    },
    tower: String
  },

  ocupado: {
    type: Boolean,
    default: false
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

  }

})

// Modelo
const Info_parqueadero_list = mongoose.model('Info_parqueadero_list ', list_Info_parq_Sch)
export default Info_parqueadero_list
