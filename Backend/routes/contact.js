const express = require('express');
const Contact = require('../models/Contact');
const router = express.Router();

// Submit contact form
router.post('/contact', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        const contact = new Contact({ name, email, message });
        await contact.save();
        res.status(201).json({ message: 'Thank you for your message!' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
