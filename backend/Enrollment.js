const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({
    studentName: {
        type: String,
        required: true
    },
    studentEmail: {
        type: String,
        required: true
    },
    studentPhone: {
        type: String,
        required: true
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    courseName: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    paymentStatus: {
        type: String,
        default: 'Pending'
    },
        razorpayPaymentId: {
        type: String,
        default: null
    },
    razorpayOrderId: {
        type: String,
        default: null
    }


}, { timestamps: true });

module.exports = mongoose.model('Enrollment', enrollmentSchema);