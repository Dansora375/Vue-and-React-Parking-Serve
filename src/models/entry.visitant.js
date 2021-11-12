import { Schema, model } from 'mongoose'
import { VEHICLE_TYPES } from '../others/vehicleTypes'
import { TsT } from './config/db'

const entryVisitantSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  identification: {
    type: Number,
    required: true
  },
  group: {
    type: String,
    required: [true, 'es necesario especificar el grupo  al que se dirige, casa o torre']
  },
  homeName: {
    type: String,
    required: [true, 'es necesario especificar el hogar al que va']
  },
  plate: {
    type: String,
    required: [true, 'Es necesario saber la placa del vehiculo']
  },
  vehicleType: {
    type: String,
    enum: VEHICLE_TYPES,
    default: VEHICLE_TYPES.CARRO
  },
  personToVisit: String,
  extra: String,
  entryTime: {
    type: Date,
    default: Date.now()
  },
  exitTime: Date,
  active: {
    type: Boolean,
    default: true
  },

  // Zona de ids
  parking: {
    type: Schema.Types.ObjectId,
    ref: 'Parking',
    required: [true, 'Debe proporcionar el parqueadero']
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

export default model('EntryVisitant', entryVisitantSchema)
