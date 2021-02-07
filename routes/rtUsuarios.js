const express = require('express')
const rtUsuarios = express.Router()
const daoUsuarios = require('../dao/daoUsuarios')
const Usuario = require('../models/Usuarios')


rtUsuarios.get('/', (req,res)=>{
    res.render('usuarios/registroUsuarios', {title: 'Registro de usuario'})
})

rtUsuarios.post('/nuevo', (req,res)=>{
    daoUsuarios.save(req.body)
    //console.log(req.file)
    .then((nuevoUsuario)=>res.render('usuarios/loginUsuario', {mensajeOk:nuevoUsuario}))
    .catch(err=>{
        if (err.code==11000){
            res.render('usuarios/registroUsuarios', {errores:"El usuario ya esta registrado, ¿perdio su contraseña? pinche aqui"})
        }
        if (err.errors.nombreUsuario && err.errors.nombreUsuario.properties.value =='')
        res.render('usuarios/registroUsuarios', {errores:"El campo nombre no puede estar vacio"})
    })
})

rtUsuarios.get('/login', (req,res)=>{
    res.render('usuarios/loginUsuario', {title: 'Login de usuario'})
})

rtUsuarios.post('/login', (req,res)=>{
    daoUsuarios.login(req.body)
    .then((u)=>{
        console.log("Recibo: ", u)
        if(u.auth){
            req.session.user = u
            req.session.autenticate = true
            res.render('usuarios/perfilUsuario', u)
        }
        else if(u==null)
            res.render('usuarios/loginUsuario',{mensaje: 'Este usuario no esxite!!'})
        else
            res.render('usuarios/loginUsuario',{mensaje: 'Usuario o constraseña incorrectos!!'})
    })
})

rtUsuarios.get('/unlogin', (req,res)=>{
    req.session.destroy()
    res.redirect('')
})


module.exports = rtUsuarios