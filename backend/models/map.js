const mongoose = require('mongoose');
const { Schema } = mongoose;
const LearningSchema = require('./learning.js');  // Import Learning schema

// Map Schema
const MapSchema = new Schema({
    background: { type: String, required: true },
    learning: LearningSchema,   // Embeds the Learning schema
    locations: {
        unlocked: { type: Boolean, default: false },
        list: [{ type: String }]   // An array of strings representing locations
    }
});

module.exports = MapSchema;
