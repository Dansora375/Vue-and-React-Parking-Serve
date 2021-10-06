import mongoose from 'mongoose'
// const Schema = mongoose.Schema
// const options_type = ['Carro', 'Moto', 'Ninguno']
// Creando el Schema
const residenteSchema = new mongoose.Schema({
  // Datos de persona
  nombre: {
    type: String,
    required: [true, 'Nombre obligatorio']
  },
  cedula: {
    type: Number,
    required: [true, 'CC obligatorio']
  },
  telefono: Number,

 

  // Datos sobre residencia
  apto_num: {
    type: Number,
    required: [true, 'numero de apartamento obligatorio']
  },
  tower: String,

  // Datos sobre el vehiculo
  placa: {
    type: String,
    required: [true, 'Placa es obligatoria']
  },
  marca: String,
  color: String,
  tipo: {
    type: String,
    enum: ['Carro', 'Moto', 'Ninguno'],
    default: ['Carro', 'Moto', 'Ninguno'].lastItem
  },
  datos_extra: String,
  activo: {
    type: Boolean,
    default: true
  },
  ocupado: {
    type: Boolean,
    default: false
  },
 
  // horaingreso: {
  //   type: Date,
  //   default: Date.now
  // },
  hora_entrada:Date,

  hora_salida: Date
})

residenteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    // returnedObject.id = returnedObject._id
    // delete returnedObject._id
    delete returnedObject.__v
  }
})
// Creando el modelo
module.exports= mongoose.model("Residente",residenteSchema);
const Residente = mongoose.model('Residente', residenteSchema)

export default Residente
