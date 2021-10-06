  import mongoose from 'mongoose';

const options_type=["Carro", "Moto", "Ninguno"]

const Entrada_vehiculo_schema = new mongoose.Schema({
  vehiculo: { //Este dato se usa para referenciar a las distintas tablas vehiculo
    type: mongoose.ObjectId,
  },
  placa: {
    type: String,
    required: [true, "Placa es obligatoria"],
  },
  tipo: {
    type: String,
    enum: options_type,
    default: options_type.lastItem,
  },
  hora_entrada: {//Colocando como default la fecha actual
    type: Date,
    default: Date.now(),
  },
  activo: {
    type: Boolean,
    default: true,
  },
  hora_salida: Date,
  datos_extra: String,
});

const Entrada_vehiculo = mongoose.model('Entrada_vehiculo', Entrada_vehiculo_schema);
export default Entrada_vehiculo;