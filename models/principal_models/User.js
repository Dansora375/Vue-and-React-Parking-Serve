import mongoose from 'mongoose'
// const Schema = mongoose.Schema

const UserSchema = new mongoose.Schema({
  cedula: Number,
  nombre: {
    type: String,
    required: [true, 'Nombre obligatorio']
  },
  Username: {
    type: String,
    required: [true, 'nombre de usuario requierido']
  },
  correo: String,

  contraseñaHash: String,
  tipo: {
    type: String,
    enum: ['Guarda', 'Gerente', 'Supervisor'],
    default: 'Guarda'
  }

})

UserSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    // returnedObject.id = returnedObject._id
    // delete returnedObject._id
    delete returnedObject.__v
    // Para que la contraseña no apra que en el json no se devuelva la contraseña
    delete returnedObject.contraseñaHash
  }
})

const User = mongoose.model('User', UserSchema)

export default User
