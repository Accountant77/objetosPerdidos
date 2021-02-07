const nodemailer = require("nodemailer");
const fs = require('fs')

const mailer={}
//Transporter con Gmail
/*mailer.send = async function send(destinatario) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'proyectoyana@gmail.com', // generated ethereal user
      pass: 'Fullstack#01', // generated ethereal password
    },
  })
*/

//Transporter ethereal
mailer.send = async function send(usuario) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'koby.abshire88@ethereal.email', // generated ethereal user
      pass: 'amhTQnn7vFBmg3JTjd', // generated ethereal password
    },
  })
  // send mail with defined transport object
  //mailer.getTemplate(template)
  //  .then(datos=>
      let info = await transporter.sendMail({
            from: 'WElCOME TO OBJETOS PERDIDOS', // sender address
            to: usuario.emailUsuario, // list of receivers
            subject: "Confirmación de registro de Usuario", // Subject line
            text: "", // plain text body
            html: "<h1>activar tu cuenta</h1>"
          })
  //  )
  console.log(info)
}

module.exports=mailer