const fs = require('fs').promises;
const path = require('path');
const { storagePaths } = require('../config/storage.config');

exports.handleUpload = (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      error: 'No file uploaded'
    });
  }

  // Construct the file URL based on file type
  const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${path.basename(path.dirname(req.file.path))}/${req.file.filename}`;
  
  res.json({
    success: true,
    file_url: fileUrl,
    file_type: path.basename(path.dirname(req.file.path)),
    file_name: req.file.filename,
    file_info: {
      originalName: req.file.originalname,
      size: req.file.size,
      mimetype: req.file.mimetype,
      path: req.file.path
    }
  });
};

exports.deleteFile = async (req, res) => {
  const { filename, type } = req.params;
  let filePath;

  console.log("Delete file:", req)

  // Determine the correct storage path based on file type
  switch (type) {
    case 'images':
      filePath = path.join(storagePaths.images, filename);
      break;
    case 'videos':
      filePath = path.join(storagePaths.videos, filename);
      break;
    case 'documents':
      filePath = path.join(storagePaths.documents, filename);
      break;
    default:
      filePath = path.join(storagePaths.general, filename);
  }

  try {
    await fs.access(filePath);
    await fs.unlink(filePath);
    res.json({
      success: true,
      message: 'File deleted successfully'
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error: 'File not found or could not be deleted'
    });
  }
};