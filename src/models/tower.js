import { Schema, model } from 'mongoose'
import { HOME_TYPES } from '../others/homeType'
import { TsT } from './config/db'

const towerSchema = new Schema({
  name: {
    type: String,
    required: [true, 'El nombre de la torre es necesario']
  },
  capacidad: {
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
TsT
)

export default model('Tower', towerSchema)
