const mongoose = require('mongoose')
const {Schema} = mongoose
const bcrypt = require('bcrypt')
const beautifyUnique = require('mongoose-beautiful-unique-validation')

//Esquema que reemplaza en este caso el constructor de la clase Usuarios para definir desde aqui la estrucutra que vamos a tener en nuestra base de datos.
const schemaUsuario = new Schema({
    nombreUsuario: {type:String, required:true},
    emailUsuario: {type:String, required:true, index:true, unique:true},
    password: {type:String, required:true},
    fecha: {type:Date},
    tipo: {type:String, required:true}
})

//Este metodo del esquema de Mongosse permite ejecutar una función 'save' antes de guardar '.pre' en la base de datos. En este caso especifico con el modulo bcrypt estamos hasheando o encriptando el password.
schemaUsuario.pre('save', function(next){
    let saltRound = 10
    bcrypt.hash(this.password, saltRound)
        .then(hash=>{
            this.password = hash
            next()
    })
})

//La clase Usuario no tiene o no necesita contructor porque esta dentro del esquema de mongosse
class Usuario{

    //getter
    /*get errores(){
        let errores=[]
        if (this.nombreUsuario=="") errores.push({error1:'Este campo no puede estar Vacio'})
        if (this.emailUsuario=="") errores.push({error2:'Este campo email no puede estar vacio'})
    }*/
    //setter

    //validacion
    
    //Este petodo privado nos permite comparar un password
    validarPass(pass){
        return bcrypt.compare(pass, this.password)
            .then(res=>{return res})
    }
}

schemaUsuario.loadClass(Usuario)
module.exports=mongoose.model('Usuario', schemaUsuario)