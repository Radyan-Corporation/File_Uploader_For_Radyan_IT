const express = require('express');
const { uploadMiddleware } = require('../middleware/upload.middleware');
const { handleUpload, deleteFile } = require('../controllers/upload.controller');
const { isImage, isVideo, isDocument } = require('../utils/file-validators');

const router = express.Router();

// Upload routes
router.post('/upload', uploadMiddleware.single('file'), handleUpload);

router.post('/upload/photo', 
  uploadMiddleware.single('file'), 
  (req, res, next) => {
    if (!isImage(req.file.mimetype)) {
      return res.status(400).json({ 
        success: false, 
        error: 'Only image files are allowed' 
      });
    }
    next();
  },
  handleUpload
);

router.post('/upload/video', 
  uploadMiddleware.single('file'),
  (req, res, next) => {
    if (!isVideo(req.file.mimetype)) {
      return res.status(400).json({ 
        success: false, 
        error: 'Only video files are allowed' 
      });
    }
    next();
  },
  handleUpload
);

router.post('/upload/document', 
  uploadMiddleware.single('file'),
  (req, res, next) => {
    if (!isDocument(req.file.mimetype)) {
      return res.status(400).json({ 
        success: false, 
        error: 'Only document files are allowed' 
      });
    }
    next();
  },
  handleUpload
);

// Delete routes
router.delete('/files/:type/:filename', deleteFile);

exports.uploadRoutes = router;