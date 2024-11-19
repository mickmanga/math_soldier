const mongoose = require('mongoose');

const AnswerSchema = new mongoose.Schema({
  text: { type: String, required: true },
  explanation: { type: String, required: true },
  true: { type: Boolean, required: true },
});

module.exports = AnswerSchema;
