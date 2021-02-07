const express = require('express')
const rtMain = express.Router()
const path = require('path')
let static= '/../public'


//Rutas con el motor de plantillas
rtMain.get('/', function (req, res) {
    res.render('principal/home');
});
rtMain.get('/contact', function (req, res) {
    res.render('contacto');
});
rtMain.get('/quienes-somos', function (req, res) {
    res.render('quienes-somos');
});



//aqui te creas las rutas que necesites: get, post, put, delete, etc.
rtMain.get('/contact', (req,res)=>{
    res.sendFile(path.join(__dirname, static, '/contacto.html'))
})

rtMain.get('/galery', (req,res)=>{
    res.sendFile(path.join(__dirname, '/../public/contacto.html'))
})

rtMain.get('/productos', (req,res)=>{
    res.sendFile(path.join(__dirname, '/../public/contacto.html'))
})

rtMain.get('/about', (req,res)=>{
    res.sendFile(path.join(__dirname, '/../public/contacto.html'))
})

module.exports = rtMain