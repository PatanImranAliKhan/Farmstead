const mongoose3 = require('mongoose');

const product={
    productname: {
        type: String
    },
    image: {
        type: String,
    },
    price: {
        type: Number,
    },
    quantity: {
        type: Number
    }
};

const Signin3 = new mongoose3.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phase: {
        type: String,
        default: "citizen"
    },
    cart: [product]
});


module.exports=mongoose3.model('Citizen',Signin3);