import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Esquema
const Sch_Info_parqueadero = new Schema({
    residente: {
        
        _id: {
            
            type: mongoose.ObjectID,
            default:""
        },
        resi_same: {
            type: String,
            required: [true, 'Nombre obligatorio',]
        },
        cc: {
            type: Number,
            required: [true, 'CC obligatorio']
        },
        tel: Number
    },
    
    apartamento:{
        _id: {

            type: mongoose.ObjectID,
            default:""
        },
        apto_num: {
             type: Number,
            required: [true, 'numero de apartamento obligatorio']
        }
    },
    
    vehiculo: {
        _id: {

            type: mongoose.ObjectID,
            default:""
        },

        vehicle_type: String,
        placa: String,
        color: String,
        marca: String,
        date: {
            type: Date,
            default: Date.now
        }
    },
    ocupado: {
            
        type: Boolean,
        default: false
    },
    
    vehicle_state: String,


});

// Modelo
const Info_parqueadero = mongoose.model('Info_parqueadero ', Sch_Info_parqueadero);
export default Info_parqueadero;