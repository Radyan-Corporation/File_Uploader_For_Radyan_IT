const express = require('express');
const cors = require('cors');
const { uploadRoutes } = require('./routes/upload.routes');
const { storagePaths } = require('./config/storage.config');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve uploaded files statically from different directories
app.use('/uploads/images', express.static(storagePaths.images));
app.use('/uploads/videos', express.static(storagePaths.videos));
app.use('/uploads/documents', express.static(storagePaths.documents));
app.use('/uploads/general', express.static(storagePaths.general));

// Routes
app.use('/api', uploadRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  Object.entries(storagePaths).forEach(([type, path]) => {
    console.log(`${type}: ${path}`);
  });
});