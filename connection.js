const mongoose = require('mongoose')

mongoose.connect('mongodb://admin:admin123456@localhost:27017/objetosPerdidos',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true
})

module.exports = mongoose.connection