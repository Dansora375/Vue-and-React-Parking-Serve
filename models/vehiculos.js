import mongoose from 'mongoose';
const Schema = mongoose.Schema;

//Creando el Schema
const vehiculoSchema=new Schema({
  placa: String,

  numero_motor: String,
  marca: String,
  color: String,
  tipo: {
    type: String,
    default: "Unknown",
  },
  descripcion: String  
//   parqueadero: mongoose.ObjectId,
});

//Creando el modelo
const Vehiculo = mongoose.model('Vehiculo',vehiculoSchema);

export default Vehiculo;

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
