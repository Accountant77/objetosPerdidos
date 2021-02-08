//Express - Commit 1 desde visual code
const express = require('express')
const app = express()
const port = process.env.port || 3000
//Node
const path = require('path')
//Otros
const multer = require('multer')
const session = require('express-session')
//Rutas
const rtMain = require('./routes/rtMain')
const rtObjetos = require('./routes/rtObjetos')
const rtUsuarios = require('./routes/rtUsuarios')
const connection = require('./connection')

//configuracion del motor de plantillas handlebars
const exphbs = require('express-handlebars')
const { json } = require('express')
app.engine('.hbs', exphbs({extname: '.hbs'}));
app.set('view engine', '.hbs');

//middleware multer y configuracion
const storage = multer.diskStorage({//Ponemos el nombre a la imagen puede ser file.originalname
    destination: path.join(__dirname, '/public/uploads'),
    filename:(req, file, cb)=>{
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

app.use(multer({
    storage:storage,//nombre
    dest: path.join(__dirname, '/public/uploads'),//ubicacion del archivo
    limits: {fieldSize:10000000},
    fileFilter: (req, file, cb)=>{
        const fileTypes = /jpeg|jpg|png|gif|svg|/ //creo una expresion regular para definir que tipos de archivo quiero recibir.
        const mimetype = fileTypes.test(file.mimetype)//con esta linea lo que hago es verificar que el mimetype, que es una propiedad propia del archivo si concuerda: el original del archivo si concuerda con alguno de los establecidos en fileTypes
        const extname = fileTypes.test(path.extname(file.originalname))//extraigo la extension del archivo con el metodo extname del path.
        if (mimetype && extname){
            return cb(null, true)
        }
        cb ("Error: No es un tipo de imagen valida")
    }
}).single('foto'))

//Mongo estado de la connection
connection.on('error', console.error.bind(console, "Error de conexion MongoDB"))
connection.once('open', ()=> console.log("Conexión a MongoDB Ok!!"))

//middleware
app.use(express.static(__dirname+'/public'))
app.use(express.urlencoded({extended:true}))//Permite que en el body lleguen los datos y no llegue undefined. Parsea los datos enviados por un formulario
app.use(session({ //Gestion de sessiones
    secret: 'miclavesecreta',
    resave: false,
    saveUninitialized: true
}))
app.use(express.json())

//routes
app.use('/', rtMain)
app.use('/objetos', rtObjetos)
app.use('/usuarios', rtUsuarios)


//run server
app.listen(port, (err)=>{console.log(`Server run on port: ${port}`)})