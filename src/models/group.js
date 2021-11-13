import { Schema, model } from 'mongoose'
import { HOME_TYPES } from '../others/homeType'
// import { TsT } from './config/db'

const groupSchema = new Schema({
  // Los nombres seran nombres ed agrupaciones, COMO:
  // TORRE A, TORRE B , etc o CASAS,
  name: {
    type: String,
    required: [true, 'El nombre de la torre es necesario']
  },
  capacity: {
    type: Number,
    default: 0
  },
  homeType: {
    type: String,
    enum: HOME_TYPES,
    default: HOME_TYPES.APARTMENT
  },
  neighborhood: {
    type: Schema.Types.ObjectId,
    ref: 'Neighborhood',
    required: [true, 'Debe seleccionar el neighborhood al que pertenece']
  }
},
{ timestamps: true },
// TsT
)

export default model('Groups', groupSchema)
