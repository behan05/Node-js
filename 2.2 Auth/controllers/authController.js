const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Dummy user storage
let users = [];

// Signup function
const signup = async (req, res) => {
    const { email, password } = req.body;

    // Check if user already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

    // Store user
    const newUser = {
        email,
        password: hashedPassword,
    };
    users.push(newUser); // In real applications, save to the database

    res.status(201).json({ message: 'User created successfully' });
};

// Login function
const login = async (req, res) => {
    const { email, password } = req.body;

    // Find user by email
    const user = users.find(user => user.email === email);
    if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token });
};

module.exports = { signup, login };
