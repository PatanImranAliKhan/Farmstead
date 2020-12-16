const express5=require('express');

const AProduct=require('../models/Aquaproduct');

const AProuter=express5.Router();

AProuter.route('/results').get((req,res,next) => {
    AProduct.find({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    })
    .catch((err) => next(err));
});


AProuter.route('/addproduct').post((req,res,next) => {
    AProduct.create(req.body)
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

AProuter.route('/updateproduct/:id').put((req,res,next) => {
    AProduct.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, { new: true })
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    })
    .catch((err) => next(err));
});

AProuter.route('/deleteproduct/:id').delete((req,res,next) =>{
    AProduct.findByIdAndDelete(req.params.id)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    })
    .catch((err) => next(err));
});

AProuter.route('/getproduct/:productname').get((req,res,next) => {
    AProduct.find({productname: req.params.productname})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    })
    .catch((err) => next(err));
});

module.exports = AProuter;