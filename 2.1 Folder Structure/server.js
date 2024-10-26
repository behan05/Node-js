const express = require("express");
const app = express();
const dotenv = require('dotenv');
// Import Database;
const connectDB = require('./config/db');  // Import the function

dotenv.config();  // Load environment variables
connectDB();  // Call the function to connect to the database

// Middleware to convert json into js object.
app.use(express.json());

// import routes
const routes = require("./routes/apiRoute");
app.use("/api", routes); // Attached All Routes.

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));