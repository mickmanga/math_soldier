const express = require('express');
const KnowledgeDataContainer = require('../models/knowledge'); // Adjust the path to your model

const router = express.Router();

// GET all KnowledgeBlocks
router.get('/', async (req, res) => {
  try {
    const knowledgeBlocks = await KnowledgeDataContainer.find();
    res.status(200).json(knowledgeBlocks);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching KnowledgeBlocks' });
  }
});

// GET a single KnowledgeBlock by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const knowledgeBlock = await KnowledgeDataContainer.findById(id);
    if (!knowledgeBlock) {
      return res.status(404).json({ error: 'KnowledgeBlock not found' });
    }
    res.status(200).json(knowledgeBlock);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching the KnowledgeBlock' });
  }
});

module.exports = router;
