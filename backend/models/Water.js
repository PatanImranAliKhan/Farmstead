const mongoose11=require('mongoose');

const water= new mongoose11.Schema({
    username: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    crop: {
        type: String,
        required: true
    },
    acres: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
});

module.exports=mongoose11.model('WaterRequest',water);