import { Schema, model } from 'mongoose'
// import { TsT } from './config/db'

const homeSchema = new Schema({
  name: { // normalmente llamado numero de apartamento
    type: String,
    required: [true, 'El nombre identificatorio es necesario']
  },

  /*
  Zona de ids
  */
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'Owner'
  },
  parking: {
    type: Schema.Types.ObjectId,
    ref: 'Parking'
  },
  tower: {
    type: Schema.Types.ObjectId,
    ref: 'Tower'
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

export default model('Home', homeSchema)
