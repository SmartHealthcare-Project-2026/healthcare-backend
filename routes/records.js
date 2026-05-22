const express = require('express');
const router = express.Router();
const Record = require('../models/Record');

// @route   POST api/records/add
// @desc    Add a new medical record / prescription
router.post('/add', async (req, res) => {
    try {
        const { patientId, doctorName, diagnosis, prescription, notes } = req.body;

        const newRecord = new Record({
            patientId,
            doctorName,
            diagnosis,
            prescription,
            notes
        });

        const record = await newRecord.save();
        res.status(201).json({ message: "Medical record added successfully!", record });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error while saving medical record.");
    }
});

// @route   GET api/records/patient/:patientId
// @desc    Get all medical history for a specific patient
router.get('/patient/:patientId', async (req, res) => {
    try {
        const records = await Record.find({ patientId: req.params.patientId }).sort({ dateRecorded: -1 });
        res.json(records);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error fetching medical history.");
    }
});

module.exports = router;