const mongoose = require('mongoose');

const RecordSchema = new mongoose.Schema({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    doctorName: {
        type: String,
        required: true
    },
    diagnosis: {
        type: String,
        required: true
    },
    prescription: [{
        medicineName: { type: String, required: true },
        dosage: { type: String, required: true }, // e.g., "Once daily", "500mg twice a day"
        duration: { type: String, required: true } // e.g., "5 days"
    }],
    notes: {
        type: String
    },
    dateRecorded: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Record', RecordSchema);