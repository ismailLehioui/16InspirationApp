const mongoose = require('mongoose');

const TeacherRequestSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', required: true
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const TeacherRequest = mongoose.model('TeacherRequest', TeacherRequestSchema);


module.exports = TeacherRequest;
