const mongoose = require('mongoose');
const { Schema, Model } = mongoose;

const MapSchema = new Schema({
  background: { type: String, required: true },
  elements: [{
    type: { type: String, required: true }, 
    ref: {
      type: Schema.Types.ObjectId,
      refPath: 'elements.type'
    }
  }]
});

const FormSchema = new Schema({
    elementType: {type: String},
    questions: [
      {
        value : String,
        answer: String,
        done: Boolean
      }
   ]
  });

const Map = new mongoose.model("Map", MapSchema);
const Form = new mongoose.model("Form", FormSchema);

module.exports = {Map, Form};