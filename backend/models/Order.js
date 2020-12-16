const mongoose12=require('mongoose');

const Order = new mongoose12.Schema({
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
    productname: {
        type: String,
        required:true
    },
    image: {
        type: String,
        required:true
    },
    price: {
        type: Number,
        required:true
    },
    quantity: {
        type: Number,
        required:true
    },
    progress: {
        type: Number,
        default: 0
    }
});

module.exports=mongoose12.model('Orders',Order);