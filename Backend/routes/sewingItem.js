// routes/sewingItem.js
const express = require("express");
const multer = require("multer");
const fs = require("fs-extra");
const SewingItem = require("../models/SewingItem");

const router = express.Router();

// Multer setup for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');  // Folder to store uploaded images
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);  // Timestamp + original file name
  }
});

// Filter for images only
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('Only JPEG and PNG images are allowed'), false);
  }
};

// Multer middleware
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },  // Limit to 5MB
  fileFilter: fileFilter,
});

// Add a new sewing item with an image
router.post("/add", upload.single('image'), async (req, res) => {
  try {
    const imageURL = req.file ? req.file.path : null;

    // Create and save a new sewing item
    const newItem = new SewingItem({ imageURL });
    await newItem.save();

    res.status(201).json({ message: "Sewing item added successfully", newItem });
  } catch (err) {
    res.status(500).json({ error: "Failed to add sewing item", err });
  }
});

const path = require('path');  // Add this at the top of your file

// Delete an old sewing item along with its image based on image filename
router.delete("/delete", async (req, res) => {
  try {
    const { image } = req.body; // Expecting the image filename in the request body

    // Find the sewing item by image filename
    const itemToDelete = await SewingItem.findOne({ imageURL: image });
    if (!itemToDelete) {
      return res.status(404).json({ error: "Sewing item not found" });
    }

    // Construct the full path to the image file
    const imagePath = path.join(__dirname, '../', itemToDelete.imageURL); // Adjust the path as necessary

    // Delete the image file associated with the item
    await fs.remove(imagePath);  // Delete the file from the filesystem

    // Delete the item from the database
    await itemToDelete.remove();

    res.status(200).json({ message: "Sewing item and image deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete sewing item", err });
  }
});



module.exports = router;
