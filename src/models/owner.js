import { Schema, model } from "mongoose";

const ownerSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  identification: {
    type: Number,
  },
  telephone: {
    type: Number,
  },

  home: [{
    type: Schema.Types.ObjectId,
    ref: 'Home'
  }],

  neighborhood: {
    type: Schema.Types.ObjectId,
    ref: 'Neighborhood',
    required: [true, 'Debe seleccionar el neighborhood al que pertenece']
  },
})

export default model('Owner', ownerSchema);