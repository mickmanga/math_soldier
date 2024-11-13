const express = require('express');
const router = express.Router();
// Import the required models
const KnowledgeDataChapter = require('../models/map.js');

// Route to get all chapters
router.get('/', async (req, res) => {
    try {
        console.log("chapter requested");
       // const chapters = await KnowledgeDataChapter.find();
        const chapters = [
            {
                name: 'Chapter1',
                paths: ["img1.png"]
            }
        ];
        
        res.json(chapters);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;