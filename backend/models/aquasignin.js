const mongoose2 = require('mongoose');

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


const Signin2 = new mongoose2.Schema({
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
    which: {
        type: String,
        required: true
    },
    phase: {
        type: String,
        default: "aquaculture"
    },
    address: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cart: [product],
});


module.exports=mongoose2.model('Aquaculture',Signin2);