const mongoose = require('mongoose');
const AnswerSchema = require('./answer');
const { Schema } = mongoose;


// Définition du schéma pour Challenge
const challengeSchema = new Schema({
  grade: String,
  answers: [AnswerSchema]
});

// Création du modèle Challenge
const Challenge = mongoose.model('Challenge', challengeSchema);

module.exports = {Challenge};
