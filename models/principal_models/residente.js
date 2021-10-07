import mongoose, { SchemaTypes } from 'mongoose'
const Schema = mongoose.Schema
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
  // Un residente puede tener varios hogares
  // Este array de hogares se llenara en el put de los hogares
  hogar:[{
    type: Schema.Types.ObjectId,
    ref: 'Hogar'
  }],

  hogar_habitando:{
    type: Schema.Types.ObjectId,
    ref:'Hogar'
  },

  // apto_num: {
  //   type: Number,
  //   required: [true, 'numero de apartamento obligatorio']
  // },
  // tower: String,

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


// Creando el modelo

const Residente = mongoose.model('Residente', residenteSchema)

export default Residente
