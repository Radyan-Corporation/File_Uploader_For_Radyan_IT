const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { storagePaths } = require('../config/storage.config');

// Ensure storage directories exist
Object.values(storagePaths).forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Configure storage based on file type
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath = storagePaths.general;

    if (file.mimetype.startsWith('image/')) {
      uploadPath = storagePaths.images;
    } else if (file.mimetype.startsWith('video/')) {
      uploadPath = storagePaths.videos;
    } else if (['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'].includes(file.mimetype)) {
      uploadPath = storagePaths.documents;
    }

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

// Create multer instance
exports.uploadMiddleware = multer({ 
  storage: storage,
  limits: {
    fileSize: 100 * 1024 * 1024 // 100MB limit
  }
});
