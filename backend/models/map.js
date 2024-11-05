const mongoose = require('mongoose');
const { Schema, Model } = mongoose;
const LearningSchema = require('./learning.js'); // Import Learning schema

// Define KnowledgeData Schema with an explicit id field
const KnowledgeDataContainerSchema = new Schema({
  id: { type: Schema.Types.ObjectId, default: new mongoose.Types.ObjectId() },
  name: String,
  paths: [String],
});

// Define KnowledgeData Schema with an explicit id field
const KnowledgeDataChapterSchema = new Schema({
  id: { type: Schema.Types.ObjectId, default: new mongoose.Types.ObjectId() },
  name: String,
  chaptersOrData: [{ type: Schema.Types.Mixed }]
});

// Define MapLocation Schema, referencing KnowledgeDataSchema by ID
const MapLocationSchema = new Schema({
  name: String, 
  locked: Boolean,
  dataBlocks: [{ type: Schema.Types.ObjectId, ref: 'KnowledgeDataSchema' }]
});

// Define Map Schema
const MapSchema = new Schema({
  background: { type: String, required: true },
  locations: [MapLocationSchema]
});

const KnowledgeDataContainer = new Model('KnowledgeData', KnowledgeDataContainerSchema);
const KnowledgeDataChapter = new Model('KnowledgeChapter', KnowledgeDataChapterSchema);

// Export schemas
module.exports = {
  MapSchema,
  MapLocationSchema,
  KnowledgeDataContainerSchema,
  KnowledgeData,
  KnowledgeDataChapter
};
