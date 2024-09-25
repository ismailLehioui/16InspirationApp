const mongoose = require('mongoose');

const TeacherRequestSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user', // Assurez-vous que 'user' est correct ici
        required: true
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

// Export du modèle TeacherRequest
const TeacherRequestModel = mongoose.model('TeacherRequest', TeacherRequestSchema);
module.exports = {TeacherRequestModel};
