const express = require("express");
const cors = require("cors");
const { uploadRoutes } = require("./src/routes/upload.routes");
const { storagePaths } = require("./src/config/storage.config");

const app = express();
const PORT = process.env.PORT || 5000;


// // CORS configuration: Allow only sovefi.com and its subdomains
// const corsOptions = {
//   origin: (origin, callback) => {
//     if (!origin || origin.includes('sovefi.com')) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   }
// };

// // Middleware
// app.use(cors(corsOptions));


// Middleware
app.use(cors());
app.use(express.json());

// Serve uploaded files statically from different directories
app.use("/uploads/images", express.static(storagePaths.images));
app.use("/uploads/videos", express.static(storagePaths.videos));
app.use("/uploads/documents", express.static(storagePaths.documents));
app.use("/uploads/general", express.static(storagePaths.general));

// Routes
app.use("/api", uploadRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  Object.entries(storagePaths).forEach(([type, path]) => {
    console.log(`${type}: ${path}`);
  });
});
console.log(`Server is running on v${process.versions.node}!`);

app.get("/", (req, res) => {
  res.send("Server is running!");
});