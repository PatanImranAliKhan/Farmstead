const express11=require('express');

const water=require('../models/Water');
const Wrouter=express11.Router();
const nodemailer=require('nodemailer');

Wrouter.route('/getRequests').get((req,res,next) => {
    water.find({})
    .then((resp) => {
        res.send(resp);
    })
    .catch((err) => {next(err)});
});

Wrouter.route('/addRequest').post((req,res,next) => {
    water.create(req.body)
    .then((resp) => {
        console.log('new responce ', resp);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'noreply.farstead@gmail.com',
              pass: 'farm@123'
            }
        });
          
        const email=resp.email;
        var mailOptions = {
            from: 'noreply.farstead@gmail.com',
            to: email,
            subject: 'Delivery of your order',
            html: `<h1>Thank you for Requesting Water Supply from our Website</h1>`
        };
          
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
        });
        res.send(resp);
    })
    .catch((err) => {next(err)});
});

module.exports=Wrouter;