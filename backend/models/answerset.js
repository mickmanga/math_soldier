const mongoose = require('mongoose');

const AnswerSetSchema = new mongoose.Schema({
  answers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Answer' }],
});

module.exports = mongoose.model('AnswerSet', AnswerSetSchema);
