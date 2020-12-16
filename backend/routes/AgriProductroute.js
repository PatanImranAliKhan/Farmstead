const express4=require('express');

const Product=require('../models/Agriproduct');

const Prouter=express4.Router();
const nodemailer=require('nodemailer');

Prouter.route('/results').get((req,res,next) => {
    Product.find({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    })
    .catch((err) => next(err));
});


Prouter.route('/addproduct').post((req,res,next) => {
    Product.create(req.body)
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

        const output = `
        <h3>Thank you for Ordering</h3>
        <br>
        <h1>Your details</h1>
        <ul>
            <li>ProductName: ${resp.productname}</li><br>
            <div style="width: 40% margin-left: 30px">
                <img src=${resp.image}>
            </div>
            <li>price: ${resp.price}</li><br>
        </ul>
        `;
          
        const email=resp.email;
        var mailOptions = {
            from: 'noreply.farstead@gmail.com',
            to: email,
            subject: 'Farstead Registration',
            html: output
        };
          
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
        });
        res.json(resp);
    })
    .catch((err) => next(err));
});

Prouter.route('/updateproduct/:id').put((req,res,next) => {
    Product.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, { new: true })
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    })
    .catch((err) => next(err));
});

Prouter.route('/deleteproduct/:id').delete((req,res,next) =>{
    Product.findByIdAndDelete(req.params.id)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    })
    .catch((err) => next(err));
});

Prouter.route('/getproduct/:productname').get((req,res,next) => {
    Product.find({productname: req.params.productname})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    })
    .catch((err) => next(err));
});

module.exports = Prouter;