const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
mongoose.connect('mongodb+srv://BussinessSystem:BusinessSystem@firstcluster.fcybv.mongodb.net/BusinessSystem?retryWrites=true&w=majority',{useNewUrlParser: true , useUnifiedTopology: true, useFindAndModify: false});

const connection = mongoose.connection;

connection.once('open', () => console.log("connected to the mongodb"));

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
const port = process.env.port || 2500;


const Agriculture=require('./routes/AgriRoute');
const Aquaculture=require('./routes/AquaRoute');
const Citizen=require('./routes/CitizenRoute');

const AgriProduct=require('./routes/AgriProductroute');
const AquaProduct=require('./routes/AquaProductRoute')
const AgriRequire=require('./routes/AgriRequireRoute');
const AquaRequire=require('./routes/AquaRequirement');

const AgriTransport=require('./routes/AgriTansportRoute');
const AquaTransport=require('./routes/AquaTransportRoute');
const feedback=require('./routes/FeedBackRoute');
const water=require('./routes/WaterRoute');
const Order=require('./routes/OrderRoute');
const stats=require('./routes/StatisticsRoute');

app.use('/agriculture',Agriculture);
app.use('/aquaculture', Aquaculture);
app.use('/citizen', Citizen);
app.use('/agriproducts', AgriProduct);
app.use('/aquaproducts',AquaProduct);
app.use('/agrirequirements',AgriRequire);
app.use('/aquarequirements',AquaRequire);
app.use('/agritransport',AgriTransport);
app.use('/aquatransport',AquaTransport);
app.use('/feedback', feedback);
app.use('/waterReq', water);
app.use('/order',Order); 
app.use('/statistics',stats);

app.listen(port, () => console.log(`running on the server ${port}`));