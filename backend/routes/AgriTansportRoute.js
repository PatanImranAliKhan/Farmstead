const express7=require('express');

const AgriTransRoute=express7.Router();

const AgriTransport=require('../models/AgriTransport');

AgriTransRoute.route('/results').get((req,res,next) => {
    AgriTransport.find({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    })
    .catch((err) => next(err));
});

AgriTransRoute.route('/addData').post((req,res,next) => {
    AgriTransport.create(req.body)
    .then((resp) => {
        console.log('new responce ', resp);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    })
    .catch((err) => next(err));
});

AgriTransRoute.route('/update/:id').put((req,res,next) => {
    AgriTransport.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, { new: true })
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    })
    .catch((err) => next(err));
});

AgriTransRoute.route('/delete/:id').delete((req,res,next) =>{
    AgriTransport.findByIdAndDelete(req.params.id)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    })
    .catch((err) => next(err));
});

AgriTransRoute.route('/getData/:id').get((req,res,next) => {
    AgriTransport.findById(req.params.id)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    })
    .catch((err) => next(err));
});

AgriTransRoute.route('/getTransportData/:name/:email').get((req,res,next) => {
    AgriTransport.find({username: req.params.name, email: req.params.email})
    .then((resp) => {
        if(resp.length==0)
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    })
    .catch((err) => next(err));
});

module.exports = AgriTransRoute;
