// models/Candidate.js
const mongoose = require('mongoose');

const CandidateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String},
  description: { type: String, required: true },
});

module.exports = mongoose.model('Candidate', CandidateSchema);