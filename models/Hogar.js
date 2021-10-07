import mongoose from 'mongoose';
const Schema = mongoose.Schema;
var Residente = mongoose.model('Residente');

const HogaresSchema = new mongoose.Schema({
  // como prueba para mostrarlos por consola se iniciara con los datos de visitantes
  apto_num: {
    type: Number,
    required: [true, 'numero de apartamento obligatorio']
  },
  tower: String,
  home_owner:{
    type: Schema.Types.ObjectId,
    ref: 'Residente'
  },
  residents:[{
     type: Schema.Types.ObjectId,
    ref: 'Residente'
  }],
  date:Date
  
})
module.exports = mongoose.model("Hogar", HogaresSchema);
const Hogar = mongoose.model('Hogar', HogaresSchema)
export default Hogar