import mongoose from 'mongoose'
const Schema = mongoose.Schema

// Creando el Schema
const parqueaderoSchema = new mongoose.Schema({
  ocupado: {
    type: Boolean,
    default: false
  }

})

parqueaderoSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})
// Creando el modelo
const parqueadero = mongoose.model('parqueadero', parqueaderoSchema)

export default parqueadero
