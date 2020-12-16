const mongoose10=require('mongoose');

const FeedBack=new mongoose10.Schema({
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
    rating: {
        type:Number,
        default: 1
    },
    sector: {
        type: String,
    },
    comment: {
        type: String,
    }
});

module.exports=mongoose10.model('feedback',FeedBack);