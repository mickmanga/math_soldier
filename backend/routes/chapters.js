const express = require('express');
const router = express.Router();

// Route to get all chapters
router.get('/', async (req, res) => {
    try {
        console.log("chapter requested");
       // const chapters = await KnowledgeDataChapter.find();
        
        res.json(chapters);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;