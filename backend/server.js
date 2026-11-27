
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Course = require('./Course');

const Enrollment = require('./Enrollment');
const Progress = require('./Progress');


const Razorpay = require('razorpay');

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(cors({
    origin: [
        "https://ccrest-website.netlify.app",
        "http://127.0.0.1:5500",
        "http://localhost:5500"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());



// Connect to MongoDB
mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('MongoDB connected successfully!');
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
    });

// Test API
app.get('/', (req, res) => {
    res.send('CCREST Backend Server is running!');
});

// Health API
app.get('/api/health', (req, res) => {
    res.json({
        status: 'success',
        message: 'CCREST API is working!'
    });
});

// GET all courses
app.get('/api/courses', async (req, res) => {
    try {
        const courses = await Course.find().sort({ createdAt: -1 });
        res.json(courses);
    } catch (error) {
        res.status(500).json({
            message: 'Failed to fetch courses',
            error: error.message
        });
    }
});


// GET a single course by ID
app.get('/api/courses/:id', async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);

        if (!course) {
            return res.status(404).json({
                message: 'Course not found'
            });
        }

        res.json(course);
    } catch (error) {
        res.status(500).json({
            message: 'Failed to fetch course',
            error: error.message
        });
    }
});


// POST create course
app.post('/api/courses', async (req, res) => {
    try {
        const { title, name, price, level, description, instructor } = req.body;

        const course = new Course({
            title: title || name,
            price: Number(price) || 0,
            level: level || 'Beginner',
            description: description || '',
            instructor: instructor || ''
        });

        const savedCourse = await course.save();

        res.status(201).json({
            message: 'Course created successfully',
            course: savedCourse
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to create course',
            error: error.message
        });
    }
});

app.delete('/api/courses/:id', async (req, res) => {
    try {
        const deletedCourse = await Course.findByIdAndDelete(req.params.id);

        if (!deletedCourse) {
            return res.status(404).json({ message: 'Course not found' });
        }

        res.json({ message: 'Course deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting course', error: error.message });
    }
});

app.put("/api/courses/:id", async (req, res) => {
    try {
        const updatedCourse = await Course.findByIdAndUpdate(
            req.params.id,
            req.body,
            { returnDocument: 'after' }
        );

        if (!updatedCourse) {
            return res.status(404).json({ message: "Course not found" });
        }

        res.json({
            message: "Course updated successfully",
            course: updatedCourse
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


    // GET all enrollments (Admin)
app.get('/api/enrollments', async (req, res) => {
    try {
        const enrollments = await Enrollment.find().sort({ createdAt: -1 });

        res.json(enrollments);
    } catch (error) {
        console.error('Fetch enrollments error:', error);

        res.status(500).json({
            message: 'Failed to fetch enrollments'
        });
    }
});


// Student Enrollment API
app.post('/api/enrollments', async (req, res) => {
    try {
        const {
            studentName,
            studentEmail,
            studentPhone,
            courseId
        } = req.body;

        const course = await Course.findById(courseId);

        if (!course) {
            return res.status(404).json({
                message: 'Course not found'
            });
        }

        const enrollment = new Enrollment({
            studentName,
            studentEmail,
            studentPhone,
            courseId: course._id,
            courseName: course.title,
            amount: course.price,
            paymentStatus: 'Pending'
        });

        await enrollment.save();

        res.status(201).json({
            message: 'Enrollment saved successfully',
            enrollment
        });

    } catch (error) {
        console.error('Enrollment error:', error);

        res.status(500).json({
            message: 'Failed to save enrollment'
        });
    }
});

// Create Razorpay Order API
app.post('/api/payment/create-order', async (req, res) => {
    try {
        const { enrollmentId } = req.body;

        const enrollment = await Enrollment.findById(enrollmentId);

        if (!enrollment) {
            return res.status(404).json({
                message: 'Enrollment not found'
            });
        }

        const options = {
            amount: enrollment.amount * 100, // Convert rupees to paise
            currency: 'INR',
            receipt: 'receipt_' + enrollment._id
        };

        const order = await razorpay.orders.create(options);

        res.json({
            message: 'Payment order created successfully',
            orderId: order.id,
            amount: order.amount,
            currency: order.currency,
            keyId: process.env.RAZORPAY_KEY_ID,
            enrollmentId: enrollment._id
        });

    } catch (error) {
        console.error('Payment order error:', error);

        res.status(500).json({
            message: 'Failed to create payment order'
        });
    }
});


// Verify Razorpay Payment API
app.post('/api/payment/verify', async (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            enrollmentId
        } = req.body;

        const crypto = require('crypto');

        // Generate signature on the server
        const generatedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(razorpay_order_id + '|' + razorpay_payment_id)
            .digest('hex');

        // Verify signature
        if (generatedSignature !== razorpay_signature) {
            return res.status(400).json({
                message: 'Payment verification failed'
            });
        }

        // Find enrollment
        const enrollment = await Enrollment.findById(enrollmentId);

        if (!enrollment) {
            return res.status(404).json({
                message: 'Enrollment not found'
            });
        }

        // Fetch order from Razorpay
        const order = await razorpay.orders.fetch(razorpay_order_id);

        // Validate order details
        if (
            order.receipt !== 'receipt_' + enrollment._id ||
            order.amount !== enrollment.amount * 100 ||
            order.currency !== 'INR'
        ) {
            return res.status(400).json({
                message: 'Order details do not match enrollment'
            });
        }

        // Prevent duplicate payment verification
        if (enrollment.paymentStatus === 'Paid') {
            return res.json({
                message: 'Payment already verified',
                enrollment
            });
        }

        // Update enrollment
        enrollment.paymentStatus = 'Paid';
        enrollment.razorpayPaymentId = razorpay_payment_id;
        enrollment.razorpayOrderId = razorpay_order_id;

        await enrollment.save();

        res.json({
            message: 'Payment verified successfully',
            enrollment
        });

    } catch (error) {
        console.error('Payment verification error:', error);

        res.status(500).json({
            message: 'Payment verification failed'
        });
    }
});



    // Get paid courses for a student by email
app.get('/api/my-courses/:email', async (req, res) => {
    try {
        const email = req.params.email;

        const enrollments = await Enrollment.find({
            studentEmail: email,
            paymentStatus: 'Paid'
        }).sort({ createdAt: -1 });

        res.json(enrollments);

    } catch (error) {
        console.error('Error fetching student courses:', error);

        res.status(500).json({
            message: 'Failed to fetch student courses'
        });
    }
});


// Get student course progress
app.get('/api/progress', async (req, res) => {
    try {
        const { studentEmail, courseName } = req.query;

        const progress = await Progress.findOne({
            studentEmail,
            courseName
        });

        res.json({
            completedModules: progress ? progress.completedModules : []
        });

    } catch (error) {
        console.error('Progress fetch error:', error);

        res.status(500).json({
            message: 'Failed to fetch progress'
        });
    }
});

// Save student course progress
app.post('/api/progress', async (req, res) => {
    try {
        const { studentEmail, courseName, moduleNumber } = req.body;

        if (!studentEmail || !courseName || !moduleNumber) {
            return res.status(400).json({
                message: 'Student email, course name and module number are required'
            });
        }

        let progress = await Progress.findOne({
            studentEmail,
            courseName
        });

        if (!progress) {
            progress = new Progress({
                studentEmail,
                courseName,
                completedModules: []
            });
        }

        if (!progress.completedModules.includes(Number(moduleNumber))) {
            progress.completedModules.push(Number(moduleNumber));
        }

        await progress.save();

        res.json({
            message: 'Progress saved successfully',
            completedModules: progress.completedModules
        });

    } catch (error) {
        console.error('Progress save error:', error);

        res.status(500).json({
            message: 'Failed to save progress'
        });
    }
});

// Start server
// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});

