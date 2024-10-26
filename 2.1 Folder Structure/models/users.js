const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
}, { timestamps: true });

const User = mongoose.model("usersData", userSchema); // Make sure the model name matches your need

module.exports = { User };
