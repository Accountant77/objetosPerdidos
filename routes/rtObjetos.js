const express = require('express')
const rtObjeto = express.Router()
const daoObjetos = require('../dao/daoObjeto')
const Objeto = require('../models/Objeto')


rtObjeto.get('/nueva', (req,res)=>{
    if (req.session.autenticate)
        res.render('objetos/formularioObjetos', {title: 'Guardar objeto perdido'})
    else
        res.render()
})

rtObjeto.post('/guardar', (req,res)=>{
    req.body.foto=`/uploads/${req.file.filename}`
    daoObjetos.save(req.body)
    res.send('<a href="http://localhost:3000/objetos/listado">Ver listado</a>')

})

rtObjeto.get('/listado', async (req,res)=>{
    let oPerdidos =  await daoObjetos.listar()
    res.render('objetos/listadoObjetos', {objetosPerdidos:oPerdidos})
})

module.exports = rtObjeto