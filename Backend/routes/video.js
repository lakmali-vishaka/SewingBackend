// routes/video.js
const express = require('express');
const Video = require('../models/Video');
const router = express.Router();


const initialVideos = [
    {
        title: "Sample Video 1",
        url: "https://www.youtube.com/watch?v=jvGEVbgIXPU", // Replace with the actual path
    },
    {
        title: "Sample Video 2",
        url: "https://www.youtube.com/watch?v=LAVJocp4MaY", // Replace with the actual path
    },
];

// Route to initialize videos (only for the developer/admin)
router.post('/initialize', async (req, res) => {
    try {
        await Video.insertMany(initialVideos);
        res.status(201).json({ message: 'Videos initialized successfully!' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route to get all videos
router.get('/video', async (req, res) => {
    try {
        const videos = await Video.find();
        res.json(videos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
