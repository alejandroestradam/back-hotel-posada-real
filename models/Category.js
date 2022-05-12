const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 6
    },
    cost: {
        type: Number,
        required: true,
    },
    highlights: {
        type: Array,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    area: {
        type: String,
        required: true
    },
    floors:{
        type: String,
        required: true
    },
    beds: {
        type: Number,
        required: true
    },
    amenities: {
        type: Array,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    images_category:{
        type: Array,
        required: true,
    }
});

module.exports =  mongoose.model('Category', categorySchema);