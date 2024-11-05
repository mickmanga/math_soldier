const mongoose = require('mongoose');
const { Schema } = mongoose;

// Learner Schema
const LearnerSchema = new Schema({
    // Define learner fields (You can expand this based on your requirements)
    name: { type: String, required: true },
    
});

module.exports = LearnerSchema;
