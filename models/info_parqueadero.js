import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Info_parqueadero_Sch = new Schema({
    residente: {
        
        _id: "",
        resi_same: {
            type: String,
            required: [true, 'Nombre obligatorio',]
        },
        cc: {
            type: Number,
            required: [true, 'CC obligatorio']
        },
        tel: Number,
    },
    
    apartamento:{
        _id: "",
        apto_num: {
             type: Number,
            required: [true, 'numero de apartamento obligatorio']
        }
    },
    
    vehiculo: {
        _id: "",
        vehicle_type: String,
        placa: String,
        color: String,
        marca: String,
        date: {
            type: Date,
            default: Date.now
        }
        },
    activo: {
        type: Boolean,
        default: false
    },
    vehicle_state:String,   


});

const Info_parqueadero = mongoose.model('Nota', Info_parqueadero_Sch);
export default Info_parqueadero;