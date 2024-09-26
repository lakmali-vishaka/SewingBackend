
const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
    
    tailorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tailor",
        required: true,
    },
    bookingDate: {
        type: Date,
        required: true,
    },
    timeOfDay: {
        type: String,
        enum: ["morning", "evening"],
        required: true,
    },
    
});

module.exports = mongoose.model("Appointment", appointmentSchema);
