import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const saltRoutes=10;//Usada para mejorar la seguridad del encriptado de contraseñas

const Schema = mongoose.Schema;

function validateEmail(val){
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
}

//Creando el Schema
const userSchema=new Schema({
  cedula: Number,
  nombre: {
    type: String,
    required: [true, 'Es necesario el nombre completo del usuario nuevo'],
  },
  usuario: {
    type: String,
    required: [true, 'El campo usuario es oblligatorio'],
  },
  correo: {

  }
  // placa: String,

  // numero_motor: String,
  // marca: String,
  // color: String,
  // tipo: {
  //   type: String,
  //   default: "Unknown",
  // },
  // descripcion: String  
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
