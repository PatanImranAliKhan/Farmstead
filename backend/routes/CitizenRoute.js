const express3=require('express');

const jwt=require('jsonwebtoken');

const nodemailer=require('nodemailer');

function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send('Unauthorized request');
    }
    let token = req.headers.authorization.split(' ')[1]
    if (token === 'null') {
        return res.status(401).send('Unauthorized request');
    }
    let payload = jwt.verify(token, 'secretKey')
    if (!payload) {
        return res.status(401).send('Unauthorized request');
    }
    req.userId = payload.subject
    next()
}

const CitizenRoute=express3.Router();

const Citizen=require('../models/citizensignin');

CitizenRoute.route('/results').get((req,res,next) => {
    Citizen.find({})
    .then((resp) => {
        if(resp.length==0)
        {
            const err=new Error('no details found');
            next(err);
        }
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    })
    .catch((err) => next(err));
});

CitizenRoute.route('/adduser').post((req,res,next) => {
    Citizen.find({username: req.body.username,email: req.body.email,password: req.body.password})
    .then((resp) => {
        if(resp.length ==0)
        {
            Citizen.create(req.body)
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
                <h3>Thank you for regustering</h3>
                <br>
                <h1>Your details</h1>
                <ul>
                    <li>Name: ${resp.username}</li>
                    <li>Email: ${resp.email}</li>
                    <li>Mobile Number: ${resp.mobile}</li>
                    <li>Address: ${resp.address}</li>
                </ul>
                `;
                  
                const email=resp.email;
                var mailOptions = {
                    from: 'noreply.farstead@gmail.com',
                    to: email,
                    subject: 'Registering for Farmstead',
                    html: output
                };
                  
                transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                      console.log(error);
                    } else {
                      console.log('Email sent: ' + info.response);
                    }
                });
                let payload = { subject: resp._id };
                let token = jwt.sign(payload, 'secretkey')
                res.send({ token , resp});
            })
            .catch((err) => next(err));
        }
        else
        {
            const err=new Error('You are already a user');
            next(err);
        }
    })
    .catch((err) => next(err));
});

CitizenRoute.route('/update/:id').put((req,res,next) => {
    Citizen.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, { new: true })
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    })
    .catch((err) => next(err));
});

CitizenRoute.route('/delete/:username').delete((req,res,next) =>{
    Citizen.findOneAndDelete({username: req.params.username})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    })
    .catch((err) => next(err));
});

CitizenRoute.route('/getuser/:email/:password').get((req,res,next) => {
    if((req.params.email=="admin" || req.params.email=="admin@gmail.com") && req.params.password=="adminstatus")
    {
        const resp={
            username: 'admin',
            email:'admin@gmail.com'
        };
        const a=true;
        res.send({resp,a});
    }
    else{
    Citizen.find({$or: [ { username: req.params.email }, { email: req.params.email }] ,password : req.params.password})
    .then((resp) => {
        if(resp.length==0)
        {
            const err=new Error('no details found');
            res.statusCode = 404;
            res.setHeader('Content-Type', 'application/json');
            next(err);
        }
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
        <h3>Thank you for login for farmstead in citizen phase</h3>
        <br>
        <h1>Your details</h1>
        <ul>
            <li>Name: ${resp[0].username}</li>
            <li>Email: ${resp[0].email}</li>
            <li>Mobile Number: ${resp[0].mobile}</li>
            <li>Address: ${resp[0].address}</li>
        </ul>
        `;
          
        const email=resp[0].email;
        var mailOptions = {
            from: 'noreply.farstead@gmail.com',
            to: email,
            subject: 'login for farmstead in Citizen phase',
            html: output
        };
          
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
        });
        let payload = { subject: resp._id };
        let token = jwt.sign(payload, 'secretkey')
        const a=false
        res.send({ token , resp,a});
    })
    .catch((err) => next(err));
    }
});

CitizenRoute.route('/updateCart/:id').put((req,res,next) => {
    Citizen.findByIdAndUpdate(req.params.id, {
        $push: {cart: req.body.cart}
    }, {new: true})
    .then((resp) => {
        let payload = { subject: resp._id };
        let token = jwt.sign(payload, 'secretkey')
        res.send({ token , resp});
    },(err) => {next(err)})
    .catch((err) => {next(err)});
});


module.exports = CitizenRoute;