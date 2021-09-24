import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const notaSchema = new Schema({
    nombre: {type: String, required: [true, 'Nombre obligatorio']},
    descripcion: String,
    usuarioId: String,
    date:{type: Date, default: Date.now},
    activo: {type: Boolean, default: true}
});

const Nota = mongoose.model('Nota', notaSchema);
export default Nota;