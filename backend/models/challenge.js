const mongoose = require('mongoose');
const { Schema } = mongoose;


// Définition du schéma pour Challenge
const challengeSchema = new Schema({
  grade: String,
  answers: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Answer'
    }
  ]
});

// Création du modèle Challenge
const Challenge = mongoose.model('Challenge', challengeSchema);

module.exports = {Challenge};
