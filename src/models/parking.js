import { Schema, model } from 'mongoose'
import { VEHICLE_TYPES } from '../others/vehicleTypes'
import { PERSON_TYPE } from '../others/personType'
// import { TsT } from './config/db'

const parkingSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Es obligatorio el dato del nombre']
  },
  vehicleType: {
    type: String,
    enum: Object.values(VEHICLE_TYPES)
  },
  personType: {
    type: String,
    enum: Object.values(PERSON_TYPE)
  },
  isTaken: {
    type: Boolean,
    default: false
  },
  lastEntryTime: Date,
  lastExitTime: Date,

  /*
  ZONA DE IDS
  */
  home: {
    type: Schema.Types.ObjectId,
    ref: 'Home'
  },
  vehicle: {
    type: Schema.Types.ObjectId,
    ref: 'Vehicle'
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

export default model('Parking', parkingSchema)
