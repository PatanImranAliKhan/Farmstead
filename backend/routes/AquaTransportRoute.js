const express7=require('express');

const AquaTransRoute=express7.Router();

const AquaTransport=require('../models/AquaTransport');

AquaTransRoute.route('/results').get((req,res,next) => {
    AquaTransport.find({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    })
    .catch((err) => next(err));
});

AquaTransRoute.route('/addData').post((req,res,next) => {
    AquaTransport.create(req.body)
    .then((resp) => {
        console.log('new responce ', resp);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    })
    .catch((err) => next(err));
});

AquaTransRoute.route('/update/:id').put((req,res,next) => {
    AquaTransport.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, { new: true })
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    })
    .catch((err) => next(err));
});

AquaTransRoute.route('/delete/:id').delete((req,res,next) =>{
    AquaTransport.findByIdAndDelete(req.params.id)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    })
    .catch((err) => next(err));
});

AquaTransRoute.route('/getData/:id').get((req,res,next) => {
    AquaTransport.findById(req.params.id)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    })
    .catch((err) => next(err));
});

AquaTransRoute.route('/getTransportData/:name/:email').get((req,res,next) => {
    AquaTransport.find({username: req.params.name, email: req.params.email})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    })
    .catch((err) => next(err));
});

module.exports = AquaTransRoute;
