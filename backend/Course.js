const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    level: {
        type: String,
        required: true
    },
    instructor: {
        type: String,
        default: 'Not specified'
    },
    description: {
        type: String,
        default: 'No description available'
    }
});

module.exports = mongoose.model('Course', courseSchema);