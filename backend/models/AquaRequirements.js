const mongoose7 = require('mongoose');

const AquaProduct = new mongoose7.Schema({
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


module.exports=mongoose7.model('aquarequirements',AquaProduct);