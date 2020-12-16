const mongoose6 = require('mongoose');

const AgriProduct = new mongoose6.Schema({
    customer: {
        type: String,
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
        type: String
    }
});


module.exports=mongoose6.model('agrirequirements',AgriProduct);