let jwt = require('jsonwebtoken');
let crypto = require("crypto");
let User = require('../models/user').User;

function getEmailToken(){
    return crypto.randomBytes(10).toString('hex');
}



module.exports = function(email){

    let emailToken = getEmailToken();

    console.log('emailToken ' + emailToken);


    let nodemailer = require('nodemailer');
    let transporter = nodemailer.createTransport({
        service: 'Yandex',
        auth: {
            user: 'pkoshlyakov2@yandex.ru',
            pass: 'P911199p'
        }
    });
    let mailOptions = {
        from: 'Pavel <pkoshlyakov2@yandex.ru>',
        to: email + '',
        subject: 'Hello',
        html: '<b>test </b> <a href = http://localhost:3000/confirm/' + emailToken + '>Ссылка</a>'
    };
    transporter.sendMail(mailOptions, function(err, info) {
        if (err) {
            return console.log(err);
        }
        return console.log("Message sent: " + info.response);
    });
    return emailToken;
};

