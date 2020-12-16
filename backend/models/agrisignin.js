const mongoose1 = require('mongoose');
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

const Signin1 = new mongoose1.Schema({
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
        default: "agriculture"
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

module.exports=mongoose1.model('Agriculture',Signin1);