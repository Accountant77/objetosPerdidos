const Objeto = require('../models/Objeto')

let daoObjetos = {}

//save
daoObjetos.save = function save(objeto){
    let objetoNuevo = new Objeto(objeto)
    objetoNuevo.save()
}

//listar
daoObjetos.listar = function listar(){
    return new Promise((resolved, reject)=>{
        resolved(Objeto.find().lean())
    })
}

//listar por nombre del objeto
daoObjetos.getElementsByName = function getElementsByName(titulo){
    return new Promise((resolved, reject)=>{
        resolved(Objeto.find({nombre:titulo}).lean())
    })
}


module.exports = daoObjetos