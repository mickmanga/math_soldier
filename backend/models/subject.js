const mongoose = require('mongoose');
const { Schema } = mongoose;
const MapSchema = require('./knowledge.js');  // Import Map schema

// Subject Schema
const SubjectSchema = new Schema({
    name: { type: String, required: true },
    chaptersOrData: [{
        type: Schema.Types.Mixed,
    }]
});

const Subject = new mongoose.model('Subject', SubjectSchema);

module.exports = Subject;
