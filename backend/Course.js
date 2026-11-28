const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        default: ''
    },
    type: {
    type: String,
    enum: ['video', 'quiz', 'document'],
    default: 'video'
},
    videoUrl: {
        type: String,
        default: ''
    },
    preview: {
        type: Boolean,
        default: false
    }
});

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
    },
    lessonsList: [lessonSchema]
});

module.exports = mongoose.model('Course', courseSchema);