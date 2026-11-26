const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
    studentEmail: {
        type: String,
        required: true
    },
    courseName: {
        type: String,
        required: true
    },
    completedModules: {
        type: [Number],
        default: []
    }
}, { timestamps: true });

module.exports = mongoose.model('Progress', progressSchema);