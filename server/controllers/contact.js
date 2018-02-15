var uuid = require("node-uuid");
const nodemailer = require('nodemailer');
const config = require("../config");

function sendEmail(req, res) {

    try {

        let data = { 'name': req.body.name, 'email': req.body.email, 'phone': req.body.phone, 'message': req.body.message, 'id': req.body.id };

        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: config.user, 
                pass: config.pass
            }
        });

        let mailOptions = {
            from: data.email,
            to: config.contactMailAddress,
            subject: config.mailSubject,
            html: "<p>Name :"+  data.name + "  </p> <p>Phone : "+  data.phone + " </p> <p> message : " + data.message + "</p>"
        };
        
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            
            res.json({ 'success': true, 'message': "Your message send to Sara's Techno successfully" })
        });
    }
    catch (e) {

        res.json({ 'success': false, 'error': error });
    }
}

module.exports = {
    sendEmail
}