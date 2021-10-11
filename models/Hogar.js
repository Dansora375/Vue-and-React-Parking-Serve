import mongoose from 'mongoose'
const Schema = mongoose.Schema

const HogaresSchema = new mongoose.Schema({
  // como prueba para mostrarlos por consola se iniciara con los datos de visitantes
  apto_num: {
    type: Number,
    required: [true, 'numero de apartamento obligatorio']
  },
  tower: {
    type: String,
    required: [true, 'letra de apartamento requerida']
  },
  // Para rellenar con datos del propietario se necesitara que se ingrese desde la vista el CC del porpietario
  home_owner: {
    type: Schema.Types.ObjectId,
    ref: 'Residente'
  },
  // Este se llenara cunaod un residente no sea porpietario desde el post de los residentes, cuando estos agreguen el apto-num y tower correspondiente para referenciar
  residents: [{
    type: Schema.Types.ObjectId,
    ref: 'Residente'
  }],
  // Este se relacionara y contendra el dato del parqueadero al que esta ligado, en cuanto en el put (edicionde) del parqueadero se le asigne a que apto_num y tower pertenece
  parqueadero: {
    type: Schema.Types.ObjectId,
    ref: 'parqueadero'
  },
  date: {
    type: Date,
    default: new Date()
  }

})

const Hogar = mongoose.model('Hogar', HogaresSchema)
export default Hogar
