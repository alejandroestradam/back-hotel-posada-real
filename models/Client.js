const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 6
    },
    email: {
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    cellphone: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    role:{
        type: String,
        required: true
    },
    date: {
        type: Date, 
        default: Date.now
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 6
    }
});

module.exports =  mongoose.model('Client', clientSchema)