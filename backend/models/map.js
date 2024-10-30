const mongoose = require('mongoose');
const { Schema } = mongoose;
const LearningSchema = require('./learning.js');  // Import Learning schema

// Map Schema

const MapDataSchema = new Schema({
    images: [String]
  });
  
  const MapLocationSchema = new Schema({
    name: String, 
    locked: Boolean,
    data: MapDataSchema
  });
  
  const MapSchema = new Schema({
    background: { type: String, required: true },
    learning: LearningSchema, 
    locations: [MapLocationSchema]   
    
  });

module.exports = {MapSchema,MapLocationSchema, MapDataSchema};
