const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');

// @route   POST api/appointments/book
// @desc    Book a new appointment
router.post('/book', async (req, res) => {
    try {
        const { patientId, doctorName, department, appointmentDate, symptoms } = req.body;

        const newAppointment = new Appointment({
            patientId,
            doctorName,
            department,
            appointmentDate,
            symptoms
        });

        const appointment = await newAppointment.save();
        res.status(201).json({ message: "Appointment requested successfully!", appointment });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error while scheduling appointment.");
    }
});

// @route   GET api/appointments/patient/:patientId
// @desc    Get all appointments for a specific patient
router.get('/patient/:patientId', async (req, res) => {
    try {
        const appointments = await Appointment.find({ patientId: req.params.patientId }).sort({ appointmentDate: 1 });
        res.json(appointments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error fetching medical schedule.");
    }
});

module.exports = router;