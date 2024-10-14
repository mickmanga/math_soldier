const express = require('express');
const router = express.Router();
const User = require('../models/user.js')

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
        res.status(201).json(newUser);
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
