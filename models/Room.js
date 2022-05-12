const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
        min: 6
    },
    number: {
        type: Number,
        required: true,
    },
    floor: {
        type: Number,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    aviability: {
        type: Boolean,
        required: true,
    },
    guests: {
        type: Number,
        required: true
    },
    client: {
        type: String,
        requred: true
    }
});

module.exports =  mongoose.model('Room', roomSchema);