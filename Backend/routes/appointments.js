// routes/appointment.js
const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");

// POST route to book an appointment
router.post("/book", async (req, res) => {
    const {  tailorId, bookingDate, timeOfDay } = req.body;

    try {
        // Create a new appointment
        const newAppointment = new Appointment({
            tailorId,
            bookingDate,
            timeOfDay,
        });

        await newAppointment.save();
        res.status(201).json({ message: "Appointment booked successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Error booking appointment", error: error.message });
    }
});

module.exports = router;
