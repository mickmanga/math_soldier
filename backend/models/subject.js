const mongoose = require('mongoose');
const { Schema } = mongoose;
const MapSchema = require('./map.js');  // Import Map schema

// Subject Schema
const SubjectSchema = new Schema({
    title: { type: String, required: true },
    map: MapSchema   // Embeds the map schema
});

module.exports = SubjectSchema;
