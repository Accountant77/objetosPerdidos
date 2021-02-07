const express = require('express')
const rtUsuarios = express.Router()
const daoUsuarios = require('../dao/daoUsuarios')
const Usuario = require('../models/Usuarios')
const mailer = require('../modules/mailer')


rtUsuarios.get('/', (req,res)=>{
    res.render('usuarios/registroUsuarios', {title: 'Registro de usuario'})
})

rtUsuarios.post('/nuevo', (req,res)=>{
    daoUsuarios.save(req.body)
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
        if(u==null)
            res.render('usuarios/loginUsuario',{mensaje: 'Este usuario no esxite!!'})
        else if(u.auth){
            req.session.user = u
            req.session.autenticate = true
            res.render('usuarios/perfilUsuario', u)
        }
        else
            res.render('usuarios/loginUsuario',{mensaje: 'Usuario o constraseña incorrectos!!', mensajePass:'Si haz olvidado tu contraseña pincha aqui.'})
    })
})

rtUsuarios.get('/unlogin', (req,res)=>{
    req.session.destroy()
    res.redirect('/')
})

rtUsuarios.get('/recuperar-clave', (req,res)=>{
    res.render('usuarios/recuperarPassword')
})

rtUsuarios.post('/recuperar-clave', (req,res)=>{
    daoUsuarios.getUserByEmail(req.body.email)
        .then(u=>{
            if (u.emailUsuario!=null){
                mailer.send(u.emailUsuario)
                res.render('usuarios/recuperarPassword', {mesajeOk:u})
            } 
            else res.render('usuarios/recuperarPassword', {mensaje:"Usuario no valido"}, {mensaje2:"¿Deseas crear una cuenta?"})
        })
        .catch(err=>console.log(err))
})
module.exports = rtUsuarios