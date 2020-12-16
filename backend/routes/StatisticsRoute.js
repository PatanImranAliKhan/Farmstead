const express13=require('express');

const Srouter=express13.Router();

const Statistics=require('../models/Statistics');

Srouter.route('/getStatistics').get((req,res,next) => {
    Statistics.find({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    })
    .catch((err) => {next(err)});
});

Srouter.route('/addStatistics').post((req,res,next) => {
    Statistics.create(req.body)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    })
    .catch((err) => {next(err)});
});

Srouter.route('/updateStatistics/:id').put((req,res,next) => {
    Statistics.findByIdAndUpdate(req.params.id, {
        $set: req.body
    },{new: true})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    })
    .catch((err) => {next(err)});
});

module.exports=Srouter;