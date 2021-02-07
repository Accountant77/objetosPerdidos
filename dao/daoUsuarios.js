const Usuario = require('../models/Usuarios')
const mailer = require('../modules/mailer')

let daoUsuarios = {}

//save
daoUsuarios.save = function save(usuario){
    return new Promise((resolved, reject)=>{
        let usuarioNuevo = new Usuario(usuario)
        usuarioNuevo.save()
        .then(()=> {
            mailer.send(usuarioNuevo)
            resolved(usuarioNuevo)
        })
        .catch(err=> reject(err))
    })
}

//busqueda por email
daoUsuarios.getUserByEmail = function getUserByEmail(email){
    return new Promise ((resolved,reject)=>{
        Usuario.findOne({emailUsuario:email})
            .then(u=> resolved(u))
            .catch(err=> reject(err))
    })
}

//login 
daoUsuarios.login = function login(datosRecibidos){
    return new Promise((resolved,reject)=>{
        daoUsuarios.getUserByEmail(datosRecibidos.email)
        .then(async u=>{
            if (u==null) resolved(u)
            else{
                let resultado = await u.validarPass(datosRecibidos.pass)
                u.auth=resultado
                resolved(u)
            }
        })
        .catch(err=>reject(err))
    })
}






module.exports = daoUsuarios