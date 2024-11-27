const path = require('path');

// Define storage paths for different file types
exports.storagePaths = {
  images: path.join(process.cwd(), 'uploads', 'images'),
  videos: path.join(process.cwd(), 'uploads', 'videos'),
  documents: path.join(process.cwd(), 'uploads', 'documents'),
  general: path.join(process.cwd(), 'uploads', 'general')
};