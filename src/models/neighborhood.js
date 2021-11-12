import { Schema, model, Mongoose } from 'mongoose'
import { TsT } from './config/db'

// Creacion del schema de Neighborhood, el cual, por el momento
// manejara muy pocos datos
const neighborhoodSchema = new Schema({
  name: {
    type: String,
    required: true
    // recordar agregar el unique  al nombre
  },
  address: {
    type: String
  },
  password: {
    type: String,
    required: [true, 'es obligatoria la contraseña del conjunto']
  }
  // position: {

  // }
},
{ timestamps: true },
TsT
)

export default model('Neighborhood', neighborhoodSchema)
