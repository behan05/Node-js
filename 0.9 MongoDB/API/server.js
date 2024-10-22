// import module.
const createLog = require('../logs/logFunc');

// import database module.
const User = require("../Models/database")

// import express
const express = require("express");
const app = express();
const PORT = 3000;

// Middleware to parse body into Object.
app.use(express.json());

// The urlencoded middleware in Express is used to parse URL-encoded data (data from forms) and add it to the req.body object
app.use(express.urlencoded({ extended: true }));

// GET Route (fetch user by ID or all users)
// using id parameter as optional by using '?' symbol.
app.get("/api/users/:id?", async (req, res) => {
    createLog(req);
    const { id } = req.params;

    try {
        // check if the id valid or not
        if (id) {
            const user = await User.findById(id);
            if (user) {
                res.setHeader("content-Type", "application/json");
                return res.status(200).json(user);
            } else {
                res.setHeader("content-Type", "application/json");
                return res.status(404).json({ message: 'User Not Found' });
            }
        } else {
            // it return all users
            const allUsers = await User.find();
            res.setHeader("content-Type", "application/json");
            return res.status(200).json(allUsers);
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'An error occurred', deatils: error });
    }
})

// Create a POST Route.
app.post("/api/users", async (req, res) => {

    // createLog method is used to create new log when express get request for create a new user.
    createLog(req);
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.setHeader("content-Type", "application/json");
        return res.status(400).json({ error: "You have to fill you the required fields!" });
    }
    try {
        // create a new user to the database
        const createdUser = await User.create({
            name: name,
            email: email,
            password: password
        });
        res.setHeader("content-Type", "application/json");
        return res.status(201).json({ message: `User Created By Id ${createdUser._id}` })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Failed to create user' });
    }
})


app.listen(PORT, () => console.log(`Server Started at post ${PORT}`));


