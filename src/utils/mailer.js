//Importamos nodemailer
const nmailer = require("nodemailer");
// copntrasena de aplicacion

require("dotenv").config();

const transporter = nmailer.createTransport({
    host: "smtp.gmail.com",
    port: "465",
    secure: true,
    auth: {
        user: "alex.patron@utelvt.edu.ec",
        pass: process.env.G_PASSWORD
    }
});

module.exports = transporter;


