
const mongoose = require("mongoose");

const SewingItemSchema = new mongoose.Schema({

  imageURL: {
    type: String,  // File path of the uploaded image
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("SewingItem", SewingItemSchema);
