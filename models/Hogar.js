import mongoose from 'mongoose'
import Tower from './Tower'
import Residente from './principal_models/residente'

const Schema = mongoose.Schema
const opts = {
  // Make Mongoose use Unix time (seconds since Jan 1, 1970)
  timestamps: { currentTime: () => Math.floor(Date.now() / 1000) }
}
const HogaresSchema = new mongoose.Schema({
  // como prueba para mostrarlos por consola se iniciara con los datos de visitantes
  apto_num: {
    type: String,
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
  // Este se relacionara y contendra el dato del parqueadero al que esta ligado, en cuanto en el put (edicion) del parqueadero se le asigne a que apto_num y tower pertenece (VISTA HOGARES)
  parqueadero: {
    type: Schema.Types.ObjectId,
    ref: 'parqueadero'
  }

},
{ timestamps: true },
opts
)

HogaresSchema.methods.isThereSpace = function (torre, callback) {
  Tower.findOne({ tower: torre }, (error, result) => {
    if (error) {
      callback(error)
    } else {
      console.log(result)
      callback(error, result)
    }
  })
}

HogaresSchema.pre('findOneAndUpdate', async function (next) {
  const docToUpdate = await this.model.findOne(this.getQuery())
  next()
  try {
    // if (this.isModified('home_owner')) {
    if (docToUpdate.home_owner !== undefined && docToUpdate.home_owner !== null && docToUpdate.home_owner !== '') {
      const residenteOwner = await Residente.findById(docToUpdate.home_owner).clone()
      // console.log(residenteOwner)
      residenteOwner.hogar.pull(docToUpdate._id)
      residenteOwner.save()
      // next()
    } else {
      // next()
    }
    // }
  } catch (error) {
    // next(error)
  }
  // if (this.isModified('home_owner')) {
  //   try {
  //     if (this.home_owner !== undefined && this.home_owner !== null && this.home_owner !== '') {
  //       const residenteOwner = await Residente.findById(this.home_owner).clone()
  //       console.log(residenteOwner)
  //       residenteOwner.hogar.pull(this._id)
  //       next()
  //     } else {
  //       next()
  //     }
  //   } catch (error) {
  //     next(error)
  //   }
  // }
})
// HogaresSchema.pre(method, fn)
HogaresSchema.post('findOneAndUpdate', async function (next) {
  const docToUpdate = await this.model.findOne(this.getQuery())
  try {
    // if (this.isModified('home_owner')) {
    const residenteOwner = await Residente.findById(docToUpdate.home_owner).clone()
    residenteOwner.hogar.push(docToUpdate._id)
    console.log(residenteOwner)
    residenteOwner.save()
    // next()
  } catch (error) {
    // next(error)
  }
})

const Hogar = mongoose.model('Hogar', HogaresSchema)
export default Hogar
