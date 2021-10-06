import mongoose from 'mongoose';
const Schema = mongoose.Schema;
var Residente = mongoose.model('Residente');

const HogaresSchema = new mongoose.Schema({
  // como prueba para mostrarlos por consola se iniciara con los datos de visitantes
  residentes: {
    type: Schema.ObjectId,
    ref: "Residente"
  }

})
module.exports = mongoose.model("Hogar", HogaresSchema);
const Hogar = mongoose.model('Hogar', HogaresSchema)
export default Hogar