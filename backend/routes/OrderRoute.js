const expres12 = require('express');

const Order=require('../models/Order');

const ORouter=expres12.Router();

const nodemailer=require('nodemailer');

ORouter.route('/orders').get((req,res,next) => {
    Order.find({progress: {$lt: 100}})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    })
    .catch((err) => {next(err)});
});

ORouter.route('/addorder').post((req,res,next) => {
    Order.create(req.body)
    .then((resp) => {
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
                <div style="width: 40% margin-left: 30px;height: 250px">
                    <img src=${resp.image}>
                </div>
                <li>price: ${resp.price}</li><br>
            </ul>
        `;
          
        const email=resp.email;
        var mailOptions = {
            from: 'noreply.farstead@gmail.com',
            to: email,
            subject: 'Made new order',
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
    .catch((err) => {next(err)});
});


ORouter.route('/addmoreorders').post((req,res,next) => {
    Order.insertMany(req.body)
    .then((resp) =>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    })
    .catch((err) => {next(err)});
});

ORouter.route('/updateOrder/:id').put((req,res,next) => {
    Order.findByIdAndUpdate(req.params.id, {
    $set: req.body
    }, { new: true })
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        if(resp.progress==100)
        {
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: 'noreply.farstead@gmail.com',
                  pass: 'farm@123'
                }
            });
            const output = `
                <h3>Your Order has been delivered</h3>
                <br>
                <h1>Your details</h1>
                <ul>
                    <li>ProductName: ${resp.productname}</li><br>
                    <div style="width: 40% margin-left: 30px;height: 250px">
                        <img src=${resp.image}>
                    </div>
                    <li>price: ${resp.price}</li><br>
                </ul>
            `;
              
            const email=resp.email;
            var mailOptions = {
                from: 'noreply.farstead@gmail.com',
                to: email,
                subject: 'Delivery of your order',
                html: output
            };
              
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
            });
        }
        res.json(resp);
    })
    .catch((err) => next(err));
});

ORouter.route('/deleteorder/:id').delete((req,res,next) =>{
    Order.findByIdAndDelete(req.params.id)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    })
    .catch((err) => next(err));
});

ORouter.route('/getOrder/:name/:email').get((req,res,next) => {
    Order.find({username:req.params.name, email:req.params.email, progress: {$lt: 100}})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    })
    .catch((err) => {next(err)});
});

module.exports=ORouter;