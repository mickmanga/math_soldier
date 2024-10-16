const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const verifyToken = require('../middlewares/authMiddleware.js');

// Example protected route
router.get('/dashboard', verifyToken, (req, res) => {
    res.json({ message: 'Welcome to the dashboard, ' + req.user.name });
});


// Predefined subjects
const predefinedSubjects = [
    { title: 'linear algebra', map: { background: 'Linear World', learning: { learners: [] }, locations: { unlocked: false, list: [] } } },
    { title: 'calculus', map: { background: 'Calculus City', learning: { learners: [] }, locations: { unlocked: false, list: [] } } },
    { title: 'statistic', map: { background: 'Statistic Station', learning: { learners: [] }, locations: { unlocked: false, list: [] } } }
];

// Create a new user with predefined subjects
router.post('/', async (req, res) => {
    try {
        const { name, password } = req.body;

        // Create a new user with predefined subjects
        const newUser = new User({
            name,
            password,
            subjects: predefinedSubjects
        });

        await newUser.save();
        console.log("new user created")
        res.status(201).json("new user created");
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a specific user by ID
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Login route
router.post('/login', async (req, res) => {
    const { name, password } = req.body;
    
    try {
        // Find the user by name
        const user = await User.findOne({ name });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }
        console.log(await bcrypt.compare(password, user.password));

        // Compare the provided password with the hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) {
            console.log("invalid credentials")
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        console.log("credentials ok");

        // Create a JWT token (replace 'your_jwt_secret' with your actual secret key)
        const token = jwt.sign({ userId: user._id, name: user.name }, 'your_jwt_secret', { expiresIn: '1h' });

        // Send back the token
        res.json({ token, message: 'Login successful' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Error logging in' });
    }
});


// Update a user
router.put('/:id', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(updatedUser);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete a user
router.delete('/:id', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
