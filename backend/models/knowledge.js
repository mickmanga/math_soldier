const mongoose = require('mongoose');
const { Schema, Model } = mongoose;
const LearningSchema = require('./learning.js'); // Import Learning schema
const Challenge = require("./challenge.js")

// Define KnowledgeData Schema with an explicit id field
const KnowledgeDataContainerSchema = new Schema({
  knowledgeType: String,
  name: String,
  data: String,
  challenge: {type: Schema.Types.ObjectId,
    ref: 'Challenge', 
  },
});

// Define KnowledgeData Schema with an explicit id field
const KnowledgeDataChapterSchema = new Schema({
  name: String,
  knowledgeType: String,
  chaptersOrData: [{ type: Schema.Types.Mixed }],
  unlocked: Boolean
});

// Define MapLocation Schema, referencing KnowledgeDataSchema by ID
const MapLocationSchema = new Schema({
  name: String, 
  backgroundPath: String,
  challenge: { type: Schema.Types.ObjectId, ref: 'Challenge' }
});

// Define Map Schema
const MapSchema = new Schema({
  background: { type: String, required: true },
  elements:
    [{
      type: Schema.Types.Mixed
      }
     ]
});

const FormSchema = new Schema({
  elementType: {type: String},
  questions: [
  {
   value : String,
   answer: String,
   done: Boolean
  }
 ]
});


const KnowledgeDataContainer = mongoose.model('KnowledgeData', KnowledgeDataContainerSchema);
const KnowledgeDataChapter = mongoose.model('KnowledgeChapter', KnowledgeDataChapterSchema);

// Export schemas
module.exports = {
  MapSchema,
  MapLocationSchema,
  KnowledgeDataContainerSchema,
  KnowledgeDataContainer,
  KnowledgeDataChapter
};
