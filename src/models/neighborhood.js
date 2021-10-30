import { Schema, model } from 'mongoose'
// import { TsT } from './config/db'

// Creacion del schema de Neighborhood, el cual, por el momento
// manejara muy pocos datos
const neighborhoodSchema = new Schema({
  nombre: {
    type: String,
    required: true
  },
  direccion: {
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
// TsT
)

export default model('Neighborhood', neighborhoodSchema)
