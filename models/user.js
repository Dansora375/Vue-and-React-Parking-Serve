/* eslint-disable semi */
/* eslint-disable no-useless-return */
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const saltRounds = 10// Usada para mejorar la seguridad del encriptado de contraseñas

const Schema = mongoose.Schema

/**
 * types es usado como estructura enum para los tipos de usuarios disponibles, asignandoles un nivel de poder
 * 1: Gerente, aquel con control total
 * 2: Supervisor, aun no definido
 * 3: Guarda, el cual solo puede listar los vehiculos en entrada
 */
const types = {
  GERENTE: {
    tipo: 'Gerente',
    nivel: 1
  },
  SUPERVISOR: {
    tipo: 'Supervisor',
    nivel: 2
  },
  GUARDA: {
    tipo: 'Guarda',
    nivel: 3
  }
}

/**
 * dado el enum de tipos, esta funcion se encarga de evaluar el nivel de un dato
 * @param {*} tipo : String con el dato del tipo
 * @returns el nivel de permisos, donde el 0 hace referencia a que no se encuentra listado entre los permisos
 */
function defineType (tipo) {
  return Object.keys(types).find(key => types[key].tipo.toLowerCase() === tipo.toLowerCase());
}
// Creando el Schema
const userSchema = new Schema({
  Cc: Number,
  name: {
    type: String,
    required: [true, 'Es necesario el nombre completo del usuario nuevo']
  },
  user: {
    type: String,
    required: [true, 'El campo usuario es oblligatorio']
  },
  email: {
    type: String
  },
  password: {
    type: String,
    required: [true, 'la contraseña es obligatoria']
  },
  type: {
    enum: ['Gerente', 'Supervisor', 'Guarda'],
    type: String,
    default: 'Guarda'
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
})

userSchema.pre('save', function (next) {
  const data = this;
  if (this.isNew || this.isModified('')) {
    bcrypt.hash(data.password, saltRounds, (error, hashedPassword) => {
      if (error) {
        next(error)
      } else {
        data.password = hashedPassword
        next()
      }
    })
  } else {
    next()
  }
})
/** METODOS
 * son funciones que se le agregan a un model para usar a conveniencia
   y requieren de un resultado de un query para poder ser usado
 * isCorrectPassword toma una contraseña dada por parametro y la compara con la contraseña encriptada del model en cuestion
 * @param {*} password : contraseña con la cual comparar la contraseña encriptada
 * @param {*} callback : funcion que evalua los resultados
 */
userSchema.methods.isCorrectPassword = function (password, callback) {
  bcrypt.compare(password, this.password, function (err, same) {
    if (err) {
      callback(err)
    } else {
      callback(err, same)
      // return same
    }
  })
}

userSchema.methods.getType = function getType () {
  const type = this.type;
  const typeLevel = types[defineType(type)].nivel;
  console.log(type)
  return { type, typeLevel };
}
function getType (tipo) {
  const type = tipo;
  const typeLevel = types[defineType(type)].nivel;
  console.log(type)
  return { type, typeLevel };
}
/**  METODOS ESTATICOS
 * Hacen referencia a los metodos que no tienen que ser llamados
   desde un resultado de un query
 * getPermission recibe los datos de logueo de un usuario y a partir de ello,
   define el nivel de permisos del usuario resultante
   * 1: Gerente: nivel mas alto, tiene permiso a todo
   * 2: Supervisor: aun no implementado ninguna funcion
   * 3: Gerente: el cual solo tiene permisos para agregar vehiculos que entran
*/

userSchema.static('getPermission', async function (usuario, password) {
  // mongoose.model.lean() convierte el resultado de un query en un objeto de javascript, osea un json
  // mongoose.model.clone() evita un error al ejecutar varias veces la misma funcion
  const dato = await this.findOne({ user: usuario }).clone();
  // dato.isCorrectPassword(password);
  // console.log(dato.getType)
  console.log(dato.isCorrectPassword(password, (error, result) => {
    if (error) {
      return false
    }
    return result;
  }))
  if (dato === undefined || dato === null) {
    return 0;
  }
  return dato.getType.typeLevel;
})

userSchema.static('getPermission2', async function (usuario, password, callback) {
  // mongoose.model.lean() convierte el resultado de un query en un objeto de javascript, osea un json
  // mongoose.model.clone() evita un error al ejecutar varias veces la misma funcion
  const dato = await this.findOne({ user: usuario }).clone();
  // console.log(dato.type)
  let datoResult
  if (dato === undefined || dato === null) {
    datoResult = 0;
    // console.log(datoResult)
  } else {
    datoResult = getType(dato.type).typeLevel;
    // console.log(datoResult)
  }
  // console.log(dato.getType)
  dato.isCorrectPassword(password, (error, result) => {
    if (error) {
      callback(error)
    } else {
      // console.log(datoResult)
      callback(error, { password: result, permission: datoResult })
    }
  })
})
// Creando el modelo
const User = mongoose.model('User', userSchema)

export default User

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
