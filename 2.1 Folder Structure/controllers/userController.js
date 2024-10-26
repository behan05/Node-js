const { User } = require("../models/users"); // Import the User model

// Get all users
const getUsers = async (req, res) => {
    try {
        const users = await User.find(); // Use await to get all users from the database
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message }); // Handle errors
    }
};

// Get a single user by ID
const getUserById = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findById(id); // Use findById to get a user by ID
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a new user
const createUser = async (req, res) => {
    const body = req.body;
    try {
        if (!body.name || !body.age) {
            return res.status(400).json({ error: "All fields are required!" });
        }
        const newUser = new User({
            name: body.name.toUppercase(),
            age: body.age,
        });
        await newUser.save(); // Save the new user instance
        res.status(201).json({ message: "New User Created!", user: newUser });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getUsers, getUserById, createUser };
