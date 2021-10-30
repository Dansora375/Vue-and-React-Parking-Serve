import { Schema, model } from 'mongoose'
import { ROLES_LEVEL, ROLES, LEVEL_FROM_NAME } from '../others/roles'
import bcrypt from 'bcrypt'
// import { TsT } from './configuration/db'

const saltRounds = 10// Usada para mejorar la seguridad del encriptado de contraseñas

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'El usuario es obligatorio']
  },
  password: {
    type: String,
    required: [true, 'Contraseña es necesaria']
  },
  rol: {
    type: String,
    enum: ROLES
  },
  isAllowed: { // referencia a que el usuario debera ser verificado antes de poder trabajar en la base
    type: Boolean,
    default: true // modificar para etapa de construccion
  },

  email: {
    type: String
  },
  identification: {
    type: Number
  },
  name: {
    type: String
  },

  neighborhood: { // el dato de conjunto no es obligatorio para todos los casos dentro de la app
    type: Schema.Types.ObjectId,
    ref: 'Neighborhood'
    // required: [true, 'Debe seleccionar el neighborhood al que pertenece']
  }

},
{ timestamps: true },
// TsT
)

userSchema.method('isCorrectPassword', function (password, callback) {
  bcrypt.compare(password, this.password, function (err, same) {
    if (err) {
      callback(err)
    } else {
      callback(err, same)
      // return same
    }
  })
})

userSchema.pre('save', function (next) {
  const data = this
  try {
    if (this.isNew || this.isModified('password')) { // solo cuando el dato es nuevo, o cuando la contraseña es modificada se encriptara la contraseña
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
  } catch (error) {
    next(error)
  }
})

export default model('User', userSchema)
