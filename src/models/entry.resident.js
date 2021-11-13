import { Schema, model } from 'mongoose'
// import { TsT } from './config/db'

const entryResidentSchema = new Schema({
  active: {
    type: Boolean,
    default: true
  },
  entryTime: {
    type: Date,
    default: Date.now()
  },
  exitTime: {
    type: Date
  },
  plate: {
    type: String
  },
  vehicleType: {
    type: String
  },

  home: {
    type: Schema.Types.ObjectId,
    required: [true, 'Es necesario especificar de que casa es']
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

export default model('EntryResident', entryResidentSchema)
