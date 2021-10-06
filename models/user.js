import mongoose from 'mongoose';
import bcrypt from 'bcrypt';


const saltRounds=10;//Usada para mejorar la seguridad del encriptado de contraseñas

const Schema = mongoose.Schema;

//Creando el Schema
const userSchema=new Schema({
  Cc: Number,
  name: {
    type: String,
    required: [true, 'Es necesario el nombre completo del usuario nuevo'],
  },
  user: {
    type: String,
    required: [true, 'El campo usuario es oblligatorio'],
  },
  email: {
    type: String, 
  },
  password: {
    type: String,
    required: [true, 'la contraseña es obligatoria'],
  },
  type: {
    enum:['Gerente', 'Supervisor', 'Guarda'],
    type: String,
    default: 'Guarda', 
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

userSchema.pre('save', function(next){
  if(this.isNew || this.isModified('')){
    pt.hash(data.password, saltRounds, (error, hashedPassword)=> {
      if(error){
        next(error);
      }else{
        data.password = hashedPassword;
        next();
      }
    });
  }else{
    next();
  }
});

userSchema.methods.isCorrectPassword = function (password, callback){
  bcrypt.compare(password, this.password, function(err, same){
    if(err){
      callback(err);
    }else{
      callback(err,same);
    }
  });
}

//Creando el modelo
const User = mongoose.model('User',userSchema);


export default User;

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
