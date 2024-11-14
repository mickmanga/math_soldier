const express = require('express');
const router = express.Router();
const { Challenge } = require('../models/challenge.js');

// Route to get all challenges
router.get('/', async (req, res) => {
    try {
        const challenges = await Challenge.find().populate('challengeDataBlocks.data');
        res.status(200).json(challenges);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
