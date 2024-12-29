const express = require("express");
const dotenv = require("dotenv");

// Load .env environment into process.env object.
dotenv.config();

const app = express();

// use to parse coming request into object.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Attached All Routes.
const routes = require("./routes/authRouters");
app.use("api/auth", routes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));