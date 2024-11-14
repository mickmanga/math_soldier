const mongoose = require('mongoose');
const { Schema } = mongoose;

// Définition du sous-schéma pour un challengeDataBlock
const challengeDataBlockSchema = new Schema({
  validated: {
    type: Boolean,
    required: true,
    default: false,
  },
  data: {
    type: Schema.Types.ObjectId,
    ref: 'KnowledgeData', // Référence au modèle existant "dataBlock"
    required: true,
  }
});

// Définition du schéma pour Challenge
const challengeSchema = new Schema({
  grade: String,
  answers: {type: Schema.Types.ObjectId, ref: 'Answers'}
});

const AnswerSchema = new mongoose.Schema(
    {
      true: [String],
      false: [String]
    }
);

const Answers = new mongoose.model('Answers', AnswerSchema);

// Création du modèle Challenge
const Challenge = mongoose.model('Challenge', challengeSchema);
const ChallengeDataBlock = mongoose.model('ChallengeDataBlock', challengeDataBlockSchema);

module.exports = {Challenge, ChallengeDataBlock, Answers};
