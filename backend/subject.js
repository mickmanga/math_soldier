const mongoose = require('mongoose');
const { Schema } = mongoose;
const MapSchema = require('./Map');  // Import Map schema

// Subject Schema
const SubjectSchema = new Schema({
    title: { type: String, required: true },
    map: MapSchema   // Embeds the map schema
});

module.exports = SubjectSchema;
