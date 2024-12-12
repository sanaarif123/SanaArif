// server.js
const express = require('express');
const connectDB = require('./DataBase/mongoDB');
const bodyParser = require('body-parser');

const cors = require('cors');
require('dotenv').config();
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

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.post('/upload', upload.single('image'), (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ msg: 'No file uploaded' });
      }
      console.log('Uploaded file:', req.file.filename);
  
      // Construct the file path relative to your public or assets directory
      const filePath = `/assets/upload/${req.file.filename}`;
  
      res.status(200).json({ filePath }); // Return the file path
    } catch (err) {
      console.error('Error uploading file:', err.message);
      res.status(500).json({ msg: err.message });
    }
  });
// Use candidate routes
const candidateRoutes = require('./routes/candidateRoutes');
const userRoutes = require('./routes/userRoutes');
const otpRoutes = require('./routes/otpRoutes');
const vote= require('./routes/voteRoutes');
app.use('/api/candidates', candidateRoutes);
app.use('/api/users',userRoutes );
app.use('/api', otpRoutes);
app.use('/api/vote',vote);
app.use('/assets', express.static(path.join(__dirname, 'assets')));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
