import { Schema, model } from 'mongoose'

const entryResidentSchema = new Schema({
  name: {
    type: String,
    required: true
  },
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

  home: {
    type: Schema.Types.ObjectId,
    required: [true, 'Es necesario especificar de que apartamento es']
  },

  vehicle: {
    type: Schema.Types.ObjectId
  },

  neighborhood: {
    type: Schema.Types.ObjectId,
    ref: 'Neighborhood',
    required: [true, 'Debe seleccionar el neighborhood al que pertenece']
  }
})

export default model('EntryResident', entryResidentSchema)
