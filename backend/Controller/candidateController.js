// controllers/candidateController.js
const Candidate = require('../Model/Candidate');
const User = require('../Model/User');
const multer = require('multer');
const path = require('path');


// Get all candidates
exports.getCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find(); // Populate the 'user' field with user data
    res.json(candidates);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
exports.addCandidate = async (req, res) => {
  const { name, image, description,} = req.body;  

  try {
    const newCandidate = new Candidate({
      name,
      image,
      description,
    });

    await newCandidate.save();
    res.status(201).json(newCandidate);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
  
  
  
}
exports.updateCandidate = async (req, res) => {
  const { _id } = req.params;
  const { name, description, image } = req.body;

  try {
    const updatedCandidate = await Candidate.findByIdAndUpdate(
      _id,
      { name, description, image },
      { new: true } // This ensures the returned document is the updated one
    );

    if (!updatedCandidate) {
      return res.status(404).json({ msg: 'Candidate not found' });
    }

    res.status(200).json(updatedCandidate);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};



