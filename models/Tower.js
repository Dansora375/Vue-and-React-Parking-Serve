import mongoose from 'mongoose'
// import User from './user';
const Schema = mongoose.Schema

const TowerSchema = new Schema({
  name: String,
  tower: {
    type: String,
    required: [true, 'El nombre de la torre es necesario']
  },
  capacidad: {
    type: Number,
    required: [true, 'Para crear una torre, debe proporcionar la cantidad de hogares que posee']
  },
  alojados: {
    type: Number,
    default: 0
  }
})
// TowerSchema.pre('save', fn)

const Tower = mongoose.model('Tower', TowerSchema)

export default Tower
