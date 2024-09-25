const { Schema, model } = require("mongoose");

const tailorSchema = new Schema({
    First_Name: {
        type: String,
        required: true
    },
    Last_Name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    Address: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    Confirm_Password: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true

    }
});

const Tailor = model("Tailor", tailorSchema);


module.exports = Tailor;  // Use CommonJS module export

