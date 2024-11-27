// Utility functions for file validation
exports.isImage = (mimetype) => {
  return mimetype.startsWith('image/');
};

exports.isVideo = (mimetype) => {
  return mimetype.startsWith('video/');
};

exports.isDocument = (mimetype) => {
  const allowedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain'
  ];
  return allowedTypes.includes(mimetype);
};