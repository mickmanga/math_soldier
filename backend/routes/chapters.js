const express = require('express');
const router = express.Router();
const { KnowledgeDataChapter, KnowledgeDataContainer } = require('../models/knowledge.js');

// Route to get all chapters
router.get('/:id', async (req, res) => {
    try {
       const chapter = await KnowledgeDataChapter.findById(req.params.id);

       const knowledgeDataList = [];

       for(let i=0; i < chapter.chaptersOrData.length; i++){

        const knowledgeDataId = chapter.chaptersOrData[i];

        const knowledgeData = await KnowledgeDataContainer.findById(knowledgeDataId);

        knowledgeDataList.push(knowledgeData);

       }

       res.status(200).json(knowledgeDataList);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;