const mongoose = require('mongoose');
const { Schema } = mongoose;
const LearnerSchema = require('./Learner');  // Import Learner schema

// Learning Schema
const LearningSchema = new Schema({
    learners: [LearnerSchema]  // An array of Learners
});

module.exports = LearningSchema;
