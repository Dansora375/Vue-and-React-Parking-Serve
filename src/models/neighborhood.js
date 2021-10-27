import { Schema, model, Mongoose } from "mongoose"

// Creacion del schema de Neighborhood, el cual, por el momento
// manejara muy pocos datos
const neighborhoodSchema = new Schema({
  nombre: {
    type: String,
    required: true,
  },
  direccion: {
    type: String,
  },
  password: {
    type: String,
    required: [true, 'es obligatoria la contraseña del conjunto']
  }
  // position: {

  // }
})

export default model('Neighborhood', neighborhoodSchema);