// import mongoose to connect with mongo database
const mongoose = require("mongoose");

// connection.
mongoose.connect('mongodb://127.0.0.1:27017/userData')
    .then(() => console.log("DataBased Connected Successfully!")
    )
    .catch((err) => {
        console.log("DataBase is not connected", err.message);
        process.exit();

    })

// create Schema instance.
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

// create model.
const User = mongoose.model("users", userSchema);

module.exports = User;
