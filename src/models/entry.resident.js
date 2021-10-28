import { Schema, model } from "mongoose";


const entryResidentSchema = new Schema({

  active: {
    type: Boolean,
    default: true,
  },
  entryTime: {
    type: Date,
    default: Date.now()
  },
  exitTime: {
    type: Date,
  },
  plate: {
    type: String,
  },
  vehicleType: {
    type: String,
  },

  home: {
    type: Schema.Types.ObjectId,
    required: [true, 'Es necesario especificar de que casa es']
  },  
  neighborhood: {
    type: Schema.Types.ObjectId,
    ref: 'Neighborhood',
    required: [true, 'Debe seleccionar el neighborhood al que pertenece']
  },
})


export default model('EntryResident', entryResidentSchema);
