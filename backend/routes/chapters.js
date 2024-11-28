const express = require('express');
const router = express.Router();
const { KnowledgeDataChapter } = require('../models/knowledge.js');

// Route to get all chapters
router.get('/:id', async (req, res) => {
    try {
       const chapter = await KnowledgeDataChapter.findById(req.params.id).populate('chaptersOrData');
       res.status(200).json(chapter);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;