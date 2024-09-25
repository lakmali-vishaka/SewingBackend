const { Schema, model } = require("mongoose");

const userSchema = new Schema({
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
    }
});

const User = model("User", userSchema);


module.exports = User;  // Use CommonJS module export

