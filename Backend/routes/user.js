const router = require("express").Router();
const User = require("../models/User");  // Ensure this points to the correct User model
const { sign } = require('jsonwebtoken');

// Generate token function
const generateToken = (userId) => {
    const token = sign({ id: userId }, 'your_secret_key', { expiresIn: '1h' });
    return token;
};

// Add user (signup)
router.route("/add").post(async (req, res) => {
    const { First_Name, Last_Name, email, Address, password, Confirm_Password } = req.body;

    // Check if passwords match
    if (password !== Confirm_Password) {
        return res.status(400).json({ error: "Passwords do not match" });
    }

    

    const newUser = new User({  
        First_Name,
        Last_Name,
        email,
        Address,
        password,
        Confirm_Password, 
    });

    newUser.save()
        .then(() => res.json("User added"))
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: "Error adding user" });
        });
});

// Get user by ID
router.route("/get/:id").get(async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);
        if (user) {
            res.status(200).json({ status: "User fetched", user });
        } else {
            res.status(404).json({ status: "User not found" });
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ status: "Error fetching user", error: err.message });
    }
});

// Login
router.route("/login").post(async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (user && await bcrypt.compare(password, user.password)) {  // Compare hashed password
            res.json({
                _id: user._id,
                email: user.email,
                First_Name: user.First_Name,
                Last_Name: user.Last_Name,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ error: "Invalid email or password" });
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "An internal server error occurred" });
    }
});



module.exports = router;
