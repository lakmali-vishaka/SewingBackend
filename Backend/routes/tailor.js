const router = require("express").Router();
const Tailor = require("../models/Tailor");  // Remove .default and switch to require
const { sign } = require('jsonwebtoken');

// Generate token function
const generateToken = (userId) => {
    const token = sign({ id: userId }, 'your_secret_key', { expiresIn: '1h' });
    return token;
};

// Add user (signup)
router.route("/add").post((req, res) => {
    const { First_Name, Last_Name, email, Address, password, Confirm_Password,city} = req.body;

    const newTailor = new Tailor({
        First_Name,
        Last_Name,
        email,
        Address,
        password,
        Confirm_Password,
        city,
    });

    newTailor.save()
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
        const tailor = await Tailor.findById(userId);
        if (tailor) {
            res.status(200).json({ status: "User fetched", tailor });
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
        const tailor = await Tailor.findOne({ email, password });
        if (tailor) {
            res.json({
                _id: tailor._id,
                email: tailor.email,
                First_Name: tailor.First_Name,
                Last_Name: tailor.Last_Name,
                token: generateToken(tailor._id),
            });
        } else {
            res.status(401).json({ error: "Invalid email or password" });
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "An internal server error occurred" });
    }
});
router.route("/search").post(async (req, res) => {
    const { name, city } = req.body;

    try {
        const query = {};
        if (name) {
            query.$or = [
                { First_Name: { $regex: name.trim(), $options: 'i' } },
                { Last_Name: { $regex: name.trim(), $options: 'i' } }
            ];
        }
        if (city) {
            const trimmedCity = city.trim();
            query.city = { $regex: trimmedCity, $options: 'i' }; // Case-insensitive search for city
        }

        console.log("Constructed Query:", query);  // Debugging line

        const tailors = await Tailor.find(query);

        console.log("Search Results:", tailors);  // Debugging line

        if (tailors.length > 0) {
            res.status(200).json({ status: "Tailors found", tailors });
        } else {
            res.status(404).json({ status: "No tailors found" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "Error fetching tailors", error: err.message });
    }
});

//navigate to the profile

// Fetch tailor profile by ID
router.route("/profile").post(async (req, res) => {
    try {
        const { id } = req.body;  // Get the tailor ID from the request body

        const tailor = await Tailor.findById(id);  // Find tailor by ID

        if (tailor) {
            res.status(200).json({ status: "Tailor found", tailor });
        } else {
            res.status(404).json({ status: "Tailor not found" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "Error fetching tailor", error: err.message });
    }
});




module.exports = router;  // Use CommonJS module export
