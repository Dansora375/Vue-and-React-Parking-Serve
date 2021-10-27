import { Schema, model } from "mongoose";
import { VEHICLE_TYPES } from "../others/vehicleTypes";

const vehicleSchema = new Schema({
  plate: {
    type: String,
    required: [true,'Es obligatorio el agregar la placa del vehiculo']
  },
  carBrand: {
    type: String,
  },
  color: {
    type: String,
  },
  type: {
    type: String,
    enum: Object.values(VEHICLE_TYPES)
  },
  extra: {
    type: String,
    default: '',
  },

  // Zona de ids
  parking: {
    type: Schema.Types.ObjectId
  },

  neighborhood: {
    type: Schema.Types.ObjectId,
    ref: 'Neighborhood',
    required: [true, 'Debe seleccionar el neighborhood al que pertenece']
  },
})


export default model('Vehicle', vehicleSchema);