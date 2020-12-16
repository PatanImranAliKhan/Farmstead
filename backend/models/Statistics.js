const mongoose13=require('mongoose');

const Statistics=new mongoose13.Schema({
    Monday: {
        login: {
            type: Number,
            default:0
        },
        Signup: {
            type: Number,
            default:0
        },
        Orders: {
            type: Number,
            default:0
        }
    },
    Tuesday: {
        login: {
            type: Number,
            default:0
        },
        Signup: {
            type: Number,
            default:0
        },
        Orders: {
            type: Number,
            default:0
        }
    },
    Wednesday: {
        login: {
            type: Number,
            default:0
        },
        Signup: {
            type: Number,
            default:0
        },
        Orders: {
            type: Number,
            default:0
        }
    },
    Thursday: {
        login: {
            type: Number,
            default:0
        },
        Signup: {
            type: Number,
            default:0
        },
        Orders: {
            type: Number,
            default:0
        }
    },
    Friday: {
        login: {
            type: Number,
            default:0
        },
        Signup: {
            type: Number,
            default:0
        },
        Orders: {
            type: Number,
            default:0
        }
    },
    Saturday: {
        login: {
            type: Number,
            default:0
        },
        Signup: {
            type: Number,
            default:0
        },
        Orders: {
            type: Number,
            default:0
        }
    },
    Sunday: {
        login: {
            type: Number,
            default:0
        },
        Signup: {
            type: Number,
            default:0
        },
        Orders: {
            type: Number,
            default:0
        }
    }
});

module.exports=mongoose13.model('Statistics',Statistics);