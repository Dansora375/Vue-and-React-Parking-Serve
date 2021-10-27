import { Schema, model } from "mongoose";

const towerSchema = new Schema ({
  name: {
    type: String,
    required: [true, 'El nombre de la torre es necesario'],
  },
  capacidad: {
    type: Number,
    default: 0,
  },
  neighborhood: {
    type: Schema.Types.ObjectId,
    ref: 'Neighborhood',
    required: [true, 'Debe seleccionar el neighborhood al que pertenece']
  }
});

export default model('Tower', towerSchema);