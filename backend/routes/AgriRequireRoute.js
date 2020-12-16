const express6=require('express');

const Requirement=require('../models/AgriRequirements');

const AgriReqrouter=express6.Router();

AgriReqrouter.route('/results').get((req,res,next) => {
    Requirement.find({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    })
    .catch((err) => next(err));
});

AgriReqrouter.route('/addreq').post((req,res,next) => {
    Requirement.create(req.body)
    .then((resp) => {
        console.log('new responce ', resp);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    })
    .catch((err) => next(err));
});

AgriReqrouter.route('/updatereq/:productname').put((req,res,next) => {
    Requirement.findOneAndUpdate({productname : req.params.productname}, {
        $set: req.body
    }, { new: true })
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    })
    .catch((err) => next(err));
});

AgriReqrouter.route('/deletereq/:productname').delete((req,res,next) =>{
    Requirement.findOneAndDelete({productname: req.params.productname})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    })
    .catch((err) => next(err));
});

AgriReqrouter.route('/getreq/:productname').get((req,res,next) => {
    Requirement.find({productname: req.params.productname})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    })
    .catch((err) => next(err));
});

module.exports = AgriReqrouter;