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
    res.render('objetos/formularioObjetos', {mensaje: 'El objeto se ha guaradado correctamente.'})

})

rtObjeto.get('/listado', async (req,res)=>{
    let oPerdidos = await daoObjetos.listar()
    res.render('objetos/listadoObjetos', {objetosPerdidos:oPerdidos})
})

rtObjeto.post('/listar-titulo', (req,res)=>{
    daoObjetos.getElementsByName(req.body.titulo)
        .then(listado=>{
            res.json(listado)
        })
        .catch(err=>console.log('Hemos tenido un problema: ', err))
})

module.exports = rtObjeto