const express = require('express');
const router = express.Router();
const candidateController = require('../Controller/candidateController');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Define the upload folder
const uploadFolder = path.join(__dirname, 'assets', 'upload');

// Create upload folder if it doesn't exist
if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadFolder); // File will be saved in 'assets/upload' folder
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Route to get all candidates
router.get('/', candidateController.getCandidates);

// Route to add a new candidate
router.post('/', candidateController.addCandidate);
router.put('/:_id', candidateController.updateCandidate);


module.exports = router;
