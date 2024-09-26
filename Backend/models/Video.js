// models/Video.js
const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    url: {
        type: String, // Store the URL/path to the video file
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Video = mongoose.model('Video', videoSchema);
module.exports = Video;
