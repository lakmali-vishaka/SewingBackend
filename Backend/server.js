const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

const app = express();

// Define the port
const PORT = process.env.PORT || 8070;

// Use middleware
app.use(cors());
app.use(express.json()); // Use the built-in express.json()

// MongoDB connection string from environment variables
const URL = process.env.MONGODB_URL;

// Connect to MongoDB
mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true, // Added to handle MongoDB deprecations
});

// Open the MongoDB connection
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB Connection successful!");
});

// Import routes
const tailorRouter = require("./routes/tailor.js");
const sewingItemRoutes = require('./routes/sewingItem');
const certificateRoutes = require('./routes/certificate');
const userRoutes = require('./routes/user');
const contactRouter = require('./routes/contact'); 
const videoRouter = require('./routes/video'); 
const appointmentRouter = require('./routes/appointments'); 


// Use routes
app.use("/tailor", tailorRouter);
app.use('/uploads', express.static('uploads'));
app.use('/sewingItem', sewingItemRoutes);
app.use('/certificate', certificateRoutes);
app.use('/user', userRoutes);
app.use('/contact', contactRouter); 
app.use('initialize', videoRouter); 
app.use('/video', videoRouter); 
app.use('/appointments', appointmentRouter); 

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is up and running on port: ${PORT}`);
});
