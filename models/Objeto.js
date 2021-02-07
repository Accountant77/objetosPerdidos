const mongoose = require('mongoose')
const {Schema} = mongoose


const schemaObjeto = new Schema({
    nombrePersona: {type:String, required:true},
    telefonoPersona: {type:String, required:true},
    nombre: {type:String, required:true},
    descripcion: {type:String, required:true, maxlength:100},
    ubicacion: {type:String, required:true},
    fecha: {type:Date},
    foto: {type:String, default:`/images/img_objetosPerdidos.png`},
    category: {type:String, required:true}
})
class Objeto{
        //constructor

        //getter

        //setter

        //validacion
}

schemaObjeto.loadClass(Objeto)
module.exports=mongoose.model('Objeto', schemaObjeto)