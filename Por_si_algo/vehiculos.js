import mongoose from 'mongoose'
const Schema = mongoose.Schema

// Creando el Schema
const vehiculoSchema = new Schema({
  // numero_motor: String, /* ? */
  placa: String,
  marca: String,
  color: String,
  tipo: {
    type: String,
    default: 'Unknown'
  },
  descripcion: String,
  // residentes: {
  //   type: Schema.Types.Objectid,
  //   REF: residentes'
  // }
})

vehiculoSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

// Creando el modelo
const Vehiculo = mongoose.model('Vehiculo', vehiculoSchema)

export default Vehiculo

/**
 * Vehiculos---------------
 * Persona-----------------
 *  -Residentes------------
 *  -Administrador---------
 *  -guarda----------------
 *  -Supervisor------------
 * torre-------------------
 * apartamento-------------
 * parqueaderos

 */
