const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    guests: {
        type: Number,
        required: true,
    },
    startDate: {
        type: Object,
        required: true
    },
    endDate: {
        type: Object,
        required: true
    },
    roomType: {
        type: String,
        required: true,
    },
    cost: {
        type: Number,
        required: true
    },
    cardnumber: {
        type: String,
        requred: true
    },
    cardname: {
        type: String,
        requred: true
    },
    date: {
        type: Date, 
        default: Date.now
    },
});


module.exports =  mongoose.model('Rerservation', reservationSchema);