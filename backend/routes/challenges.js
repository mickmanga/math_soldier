const express = require('express');
const router = express.Router();
const { Challenge } = require('../models/challenge.js');
const AnswerSet = require('../models/answerset.js');
const Answer = require('../models/answer.js');

// Route to get all challenges
router.get('/', async (req, res) => {
    try {
        const challenges = await Challenge.find()
            .populate({
                path: 'answers',
                populate: { path: 'answers', model: 'Answer' }, // Populate answers within AnswerSet
            });
        res.status(200).json(challenges);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route to get a single challenge by ID
router.get('/:id', async (req, res) => {

    try {
        const challenge = await Challenge.findById(req.params.id);

        if (!challenge) {
            console.log("we didnt find the challenge");
            return res.status(404).json({ message: 'Challenge not found' });
        } else {
            console.log("we found your challenge");
        }
        res.status(200).json(challenge);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
