import mongoose from 'mongoose'

// Por ahora no abara opcion de crear parqueaderos desde la vista, los parqueaderos seran ingresados desde la base, seran una lista estatica con la finalidad de asignarlos a un determinado hogar
const ParqueaderoSche = new mongoose.Schema({

  nombre_Parqueadero: {
    type: String,
    required: [true, 'nombre del parqueadero Obligatorio']
  },
  assigned:{
    type:Boolean,
    default:false
  }
})

const parqueadero = mongoose.model('parqueadero',ParqueaderoSche )
export default parqueadero