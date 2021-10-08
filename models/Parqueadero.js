import mongoose from 'mongoose'
const Schema = mongoose.Schema

// Por ahora no abara opcion de crear parqueaderos desde la vista, los parqueaderos seran ingresados desde la base, seran una lista estatica con la finalidad de asignarlos a un determinado hogar
const ParqueaderoSche = new mongoose.Schema({

  // Los nombres para motos seran diferentes a los de carros
  nombre_Parqueadero: {
    type: String,
    required: [true, 'nombre del parqueadero Obligatorio']
  },
  // Se llenara con el id y los datos del hogar con el que el parqueadero esta relacionado, en cuanto se ejecute el put (edicion) y se asignen en la vista los datos de: apto_num y tower, con el cual se relaciona
  hogar: {
    type: Schema.Types.ObjectId,
    ref: 'Hogar'
  },
  // Se enviara el dato del id del vehiculo con el concat desde el post de la ruta del vehiculo
  // RECORDAR TRAER EL DATO DEL TIPO DE VEHICULO con el poPULATE
  vehiculo: {
    type: Schema.Types.ObjectId,
    re: 'vehiculo'
  },
  assigned: {
    type: Boolean,
    default: false
  }
})

const parqueadero = mongoose.model('parqueadero', ParqueaderoSche)
export default parqueadero
