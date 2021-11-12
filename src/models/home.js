import { Schema, model } from 'mongoose'
import { TsT } from './config/db'

const homeSchema = new Schema({
  name: { // normalmente llamado numero de apartamento
    type: String,
    required: [true, 'El nombre identificatorio es necesario']
  },

  /*
  Zona de ids
  */

  //  se envia en id desde el post del owner
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'Owner'
  },
  // El id se obtiene en el campo cuando se asigna el
  // parqueadero a un hogar
  parking: {
    type: Schema.Types.ObjectId,
    ref: 'Parking'
  },
  // Cuando se crea un home se debe de seleccinar en el
  // select a que torre pertenece
  group: {
    type: Schema.Types.ObjectId,
    ref: 'Groups'
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

export default model('Home', homeSchema)
