import mongoose from 'mongoose'
// const Schema = mongoose.Schema

// Creando el Schema
const hogarSchema = new mongoose.Schema({
  apto_num: Number,
  tower: String
})

hogarSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})
// Creando el modelo
// const hogar = mongoose.model('hogar', hogarSchema)

// export default hogar
