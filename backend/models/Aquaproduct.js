const mongoose5 = require('mongoose');

const Product = new mongoose5.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    productname: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
    },
    image: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    }
});


module.exports=mongoose5.model('aquaproducts',Product);